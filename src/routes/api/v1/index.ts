import { Router } from 'express';
import admin from './admin.router';
import user from './user.router';
import { authenticate } from 'passport';
import { authController } from 'src/controllers';
import * as Validator from '@src/validators';
const router: Router = Router();

router.use('/admins', admin);
router.use('/users', user);

router.route('/token')
	.head(authenticate('token', {session: false}), authController.success)
	.post(Validator.Auth.refreshToken, authController.refreshToken);

router.delete('/logout', authController.logout);

export default router;
