import { Router } from 'express';
import { adminController } from '../../../controllers';
import * as Validators from '../../../validators';
import { authenticate } from 'passport';

const router: Router = Router();

// secured router
const secureRouter: Router = Router();

// secured router to control users
// const userRouter: Router = Router();

// userRouter.get('/', validateSchema(UserSchema.list, 'query'), adminController.userList);
// userRouter.post('/create', validateSchema(UserSchema.document, 'body'), userController.create);

secureRouter.head('/token', adminController.validateToken);
secureRouter.get('/details', adminController.fetchProfile);

// secureRouter.use('/users', userRouter);

router.post('/authenticate', Validators.Admin.login, adminController.login);

router.use('/', authenticate('admin-token', { session: false }), secureRouter);

export default router;