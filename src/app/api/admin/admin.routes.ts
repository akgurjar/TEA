import { Router } from 'express';
import { authenticate } from 'passport';
import { adminController } from './admin.controller';
// import { adminValidators } from './admin.validators';

// Create router
const router: Router = Router();

// secured router
const secureRouter: Router = Router();

// Get Admins List
// secureRouter.get('/', adminValidators.list, adminController.list);

// Get logined user profile
secureRouter.get('/profile', adminController.profile);

// Entity Router to handle signle admin routes
const entityRouter = Router();

entityRouter.route('/')
	.get(adminController.detail)
	.patch(adminController.update);

// Access admin with id
secureRouter.use('/:id', entityRouter);

// Accept user signin requests
// router.post('/signin', userController.loginHandler);

// router.post('/', Validators.User.otp, userController.sendOtp);

// router.post('/verify', Validators.User.verification, extractClientDetails, userController.verifyOtp);

router.use('/', authenticate('token', { session: false }), secureRouter);

export const adminRoutes = { path: '/admins', router };
