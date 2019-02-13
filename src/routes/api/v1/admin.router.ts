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

secureRouter.get('/profile', adminController.fetchProfile);

// secureRouter.use('/users', userRouter);

router.post('/authenticate', Validators.Admin.login, adminController.login);

router.post('/forgot', Validators.Admin.forgot, adminController.forgot);

router.use('/', authenticate('token', { session: false }), secureRouter);

export default router;
