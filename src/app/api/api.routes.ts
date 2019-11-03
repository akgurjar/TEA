import { Router } from 'express';

import { adminRoutes } from './admin/admin.routes';
import { userRoutes } from './user/user.routes';
import { responseMiddleware } from '@middlewares/response';
import { Api } from './api.interface';

// create Router
const router: Router = Router();

router.use(responseMiddleware);

router.use('/', (req: Api.Request, res: Api.Response) => {
	res.success('Api is listening');
});

// Use admin routes
router.use(adminRoutes.path, adminRoutes.router);

// Use user routes
router.use(userRoutes.path, userRoutes.router);

export const apiRoutes = { path: '/api', router };
