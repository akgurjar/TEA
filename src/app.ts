import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as favicon from 'serve-favicon';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as ejs from 'ejs';
// import { promisify } from 'util';
import { MongoError } from 'mongodb';
import { connect, connection } from 'mongoose';
import { environment, Bootstrap, DbLoagger, ResponseError, Mailer } from './utils';

import { Request, Application, Response, NextFunction } from 'express';

import './strategies';

import routes from './routes';

export const app: App.Singleton<Application> = {
	instance: express(),
	async init() {
		this.initConfig();
		await Mailer.init();
		await this.initDatabase();
		this.initRoutes();
	},
	/**
	 * It is used to setup view engine for templates rendering.
	 */
	initViewEngine() {
		this.instance.set('views', path.join(__dirname, '../public'));
		this.instance.engine('html', ejs.renderFile);
		this.instance.set('view engine', 'html');
	},
	/**
	 * Initialize the database connection with MongoDB
	 */
	async initDatabase(): Promise<void> {
		connect(environment.MONGODB_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}, (err?: MongoError) => {
			if (err) {
				throw(new Error(err.message));
			}
		});
		DbLoagger.info('Connecting Database');
		await new Promise(connection.once.bind(connection, 'open'));
		DbLoagger.info('Database Connected');
		await Bootstrap.init();
	},
	/**
	 * Initialize App Configurations for favicon, logger, cookie and body parser
	 */
	initConfig() {
		this.initViewEngine();
		this.instance.use(favicon(path.join(process.cwd(), 'public/client', 'favicon.png')));
		this.instance.use(logger('dev'));
		this.instance.use(bodyParser.json());
		this.instance.use(bodyParser.urlencoded({ extended: false }));
		this.instance.use(cookieParser());
	},
	initRoutes() {
		this.instance.use('/', routes);
		this.instance.use('/admin', express.static(path.join(process.cwd(), 'public/admin')));
		this.instance.use('/templates', express.static(path.join(process.cwd(), 'public/templates')));
		this.instance.use(express.static(path.join(process.cwd(), 'public/client')));

		this.instance.use((req: Request, res: Response, next: NextFunction) => {
			next(new ResponseError(404, 'Not Found'));
		});

		this.instance.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};
			// render the error page
			res.status(err.status || 500);
			res.render('client/error');
		});
	},
};
