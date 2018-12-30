import { Router } from 'express';
import { AdminSchema } from './schema/admin.schema';
import { RequestHandler } from '../../../utils';
import { adminController } from '../../../controllers';

const router: Router = Router();

router.post(
    '/authenticate',
    RequestHandler.validate(AdminSchema.login, 'body'),
    <any>adminController.login
);

export default router;