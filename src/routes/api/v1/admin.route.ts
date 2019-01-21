import { Router } from 'express';
import { AdminSchema, UserSchema } from './schema';
// import { val } from '../../../utils';
import { adminController, userController } from '../../../controllers';
import { validateSchema } from '../../../middlewares';
import { authenticate } from 'passport';

const router: Router = Router();

// secured router
const secureRouter: Router = Router();

// secured router to control users
const userRouter: Router = Router();

userRouter.get('/', validateSchema(UserSchema.list, 'query'), adminController.userList);
userRouter.post('/create', validateSchema(UserSchema.document, 'body'), userController.create);

secureRouter.route('/')
    .head(adminController.validateToken)
    .get(adminController.fetchProfile);

secureRouter.use('/users', userRouter);

router.post('/authenticate', validateSchema(AdminSchema.login, 'body'), adminController.login);

router.use('/', authenticate('admin-token', { session: false }), secureRouter);

export default router;