import { Router } from 'express';
import { userController } from '@src/controllers';
import * as Validators from '@src/validators';
import { authenticate } from 'passport';
import { extractClientDetails } from '@src/middlewares';

const router: Router = Router();

// secured router
const secureRouter: Router = Router();

// Get Users List
secureRouter.get('/', Validators.User.list, userController.list);

// Get logined user profile
secureRouter.get('/profile', userController.fetchProfile);

// Entity Router
const entityRouter = Router();

entityRouter.route('/')
.get(userController.fetchDetails)
.patch(userController.update);

// Access user with id
secureRouter.use('/:id', Validators.Common.entity, entityRouter);

// authenticate user
router.post('/authenticate', Validators.User.otp, userController.sendOtp);

// router.post('/', Validators.User.otp, userController.sendOtp);

router.post('/verify', Validators.User.verification, extractClientDetails, userController.verifyOtp);

router.use('/', authenticate('token', { session: false }), secureRouter);

export default router;
