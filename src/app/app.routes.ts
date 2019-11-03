import { Router, Request, NextFunction, Response } from 'express';
import { ResponseError } from '@src/utils';
import { apiRoutes } from './api/api.routes';
// create Router
const router: Router = Router();

// Use api routes
router.use(apiRoutes.path, apiRoutes.router);

// throw error to next error handler route
router.use((req: Request, res: Response, next: NextFunction) => {
	next(new ResponseError(404, 'Not Found'));
});

// A error handler route
router.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('client/index');
});

export default router;
