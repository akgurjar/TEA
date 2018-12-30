
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import { connect, connection } from 'mongoose';
import { environment, bootstrapApp } from './utils';

import { Application, Request, Response, NextFunction } from 'express';

import routes from './routes';


const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, '../public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
	var err: any = new Error('Not Found');
	err.status = 404;
	next(err);
});

// connect mongodb
connect(environment.MONGODB_URI, {useNewUrlParser: true});
connection.once('open', function() {
	console.log('Database Connected');
	bootstrapApp();
});



// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

export default app;
