import { NextFunction, Router, type Request, type Response } from 'express';

import { adminRoutes } from './admin/admin.routes.js';
import { userRoutes } from './user/user.routes.js';
import { responseMiddleware } from '#middlewares/response.middleware';
import { ApiError } from '#utils/error.util';

export const path = '/api';
export const router: Router = Router();

router.use(responseMiddleware);

router.use('/', (req: Request, res: Response) => {
	res.success('Api is listening');
});

// Use admin routes
router.use(adminRoutes.path, adminRoutes.router);

// Use user routes
router.use(userRoutes.path, userRoutes.router);

// throw error to next error handler route
router.use((_: Request, __: Response, next: NextFunction) => {
	next(ApiError.notFound('Not Found'));
});

router.use((err: ApiError, _: Request, res: Response, __: NextFunction) => {
	res.status(err.status || 500).json({
		message: err.message,
		error: err.error,
	});
});
