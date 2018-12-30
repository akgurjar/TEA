import { Router } from 'express';
import { AdminSchema } from './schema/admin.schema';
import { RequestHandler } from '../../../utils';
import { adminController } from '../../../controllers';
import { validateAdminToken } from '../../../middlewares';
const router: Router = Router();

router.route('/')
    .head(validateAdminToken, adminController.validateToken)
    // .get();

router.post(
    '/authenticate',
    RequestHandler.validate(AdminSchema.login, 'body'),
    <any>adminController.login
);

export default router;