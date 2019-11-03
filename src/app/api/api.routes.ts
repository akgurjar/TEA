import { Router } from 'express';

import { adminRoutes } from './admin/admin.routes';
import { userRoutes } from './user/user.routes';

// create Router
const router: Router = Router();

// Use admin routes
router.use(adminRoutes.path, adminRoutes.router);

// Use user routes
router.use(userRoutes.path, userRoutes.router);

export const apiRoutes = { path: 'api', router };
