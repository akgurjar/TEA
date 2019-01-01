import { Router } from 'express';
import { AdminSchema } from './schema/admin.schema';
// import { val } from '../../../utils';
import { adminController } from '../../../controllers';
import { validateSchema } from '../../../middlewares';
import { authenticate } from 'passport';

const router: Router = Router();

const secureRouter: Router = Router();

secureRouter.route('/')
    .head(adminController.validateToken)
    .get(adminController.fetchProfile);

router.post('/authenticate', validateSchema(AdminSchema.login, 'body'), adminController.login);

router.use('/', authenticate('admin-token', { session: false }), secureRouter);

export default router;