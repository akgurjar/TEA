// import { app } from '@src/app';
import { Server } from 'http';
import * as Debug from 'debug';
import express from 'express';
import * as cookieParser from 'cookie-parser';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as path from 'path';
import * as ejs from 'ejs';
// import { promisify } from 'util';
import { connect } from 'mongoose';
import { environment, Console, DbLoagger, Bootstrap, Mailer } from '@src/utils';

import appRoutes from '@app/app.routes';

const debug = Debug('tea:server');

class Application {
	/**
	 * @class Application
	 * @description A function to create http server and attach application instance to it.
	 */
	static init() {
		const app = new Application();
		const server = new Server(app.instance);
		server.on('listening', () => {
			const addr = server.address();
			const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
			debug('Listening on ' + bind);
		});
		server.on('error', (error: any) => {
			if (error.syscall !== 'listen') {
				throw error;
			}
			const bind: any = typeof app.port === 'string' ? 'Pipe ' + app.port : 'Port ' + app.port;

			// handle specific listen errors with friendly messages
			switch (error.code) {
				case 'EACCES':
					Console.error(bind + ' requires elevated privileges');
					process.exit(1);
				// break;
				case 'EADDRINUSE':
					Console.error(bind + ' is already in use');
					process.exit(1);
				// break;
				default:
					throw error;
			}
		});
		app.load().then(() => {
			server.listen(app.port, () => {
				Console.info(`Server Listening on port <${app.port}>`);
			});
		});
	}

	/**
	 * @class Application
	 * @description A instance of express application
	 */
	instance = express();
	get port() {
		return this.instance.get('port');
	}
	constructor() {
		this.instance.set('port', this.normalizePort());
	}
	/**
	 * @description Normalize a port into a number, string, or false.
	 */
	normalizePort() {
		const port: number = parseInt(environment.PORT, 10);

		if (isNaN(port)) {
			// named pipe
			return environment.PORT;
		}

		if (port >= 0) {
			// port number
			return port;
		}
		return false;
	}
	async load() {
		this.initConfig();
		await Mailer.init();
		await this.initDatabase();
		this.instance.use(appRoutes);
	}
	/**
	 * It is used to setup view engine for templates rendering.
	 */
	initViewEngine() {
		this.instance.set('views', path.join(__dirname, '../public'));
		this.instance.engine('html', ejs.renderFile);
		this.instance.set('view engine', 'html');
	}
	/**
	 * Initialize the database connection with MongoDB
	 */
	async initDatabase(): Promise<void> {
		DbLoagger.info('Connecting Database');
		await connect(environment.MONGODB_URI);
		DbLoagger.info('Database Connected');
		await Bootstrap.init();
	}
	/**
	 * Initialize App Configurations for favicon, logger, cookie and body parser
	 */
	initConfig() {
		this.initViewEngine();
		this.instance.use(express.static(path.join(process.cwd(), 'public/client')));
		this.instance.use(favicon(path.join(process.cwd(), 'public/client', 'favicon.png')));
		this.instance.use(logger('dev'));
		this.instance.use(express.json());
		this.instance.use(express.urlencoded({ extended: true }));
		this.instance.use(cookieParser());
	}
}

try {
	// Initialize Application
	Application.init();
} catch (err) {
	// Handle application errors with friendly messages
	Console.error(err.message);
}
