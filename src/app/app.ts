import express, {
	type Express,
	type Request,
	type Response,
	type NextFunction,
} from 'express';
import path from 'node:path';
import ejs from 'ejs';
import { ApiError } from '#utils/error.util';
import favicon from 'serve-favicon';
import * as apiRoutes from './api/api.routes.js';
import * as webRoutes from './web/web.routes.js';
import { mongodb } from '#database/mongo/mongo.db';
import cookieParser from 'cookie-parser';

export const app: Express = express();

await mongodb.connect();

// View engine
app.set('views', path.join(import.meta.dirname, '../../views'));
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, '../../public')));
app.use(
	favicon(path.join(import.meta.dirname, '../../public/client/favicon.png')),
);
// this.instance.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

// Use api routes
app.use(apiRoutes.path, apiRoutes.router);
app.use(webRoutes.router);

// throw error to next error handler route
app.use((_: Request, __: Response, next: NextFunction) => {
	next(ApiError.notFound('Not Found'));
});

// // A error handler route
app.use((err: ApiError, _: Request, res: Response, __: NextFunction) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	// render the error page
	res.status(err.status || 500).render('login');
});
