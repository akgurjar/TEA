import { Router } from 'express';
import { authenticate } from 'passport';
import { userController } from './user.controller';
import { userValidators } from './user.validators';

// Create router
const router: Router = Router();

// secured router
const secureRouter: Router = Router();

// Get Users List
secureRouter.route('/')
	.post(userController.register)
	.get(userValidators.list, userController.list);

// Get logined user profile
secureRouter.get('/profile', userController.profile);

// Entity Router to handle signle user routes
const entityRouter = Router();

entityRouter.route('/')
	.get(userController.detail)
	.patch(userController.update);

// Access user with id
// secureRouter.use('/:id', entityRouter);

// Accept user signin requests
// router.post('/signin', userController.loginHandler);

// router.post('/', Validators.User.otp, userController.sendOtp);

// router.post('/verify', Validators.User.verification, extractClientDetails, userController.verifyOtp);

router.use('/', authenticate('token', { session: false }), secureRouter);

export const userRoutes = { path: '/users', router };
