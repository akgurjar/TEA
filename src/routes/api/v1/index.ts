import { Router } from 'express';
import admin from './admin.router';
import user from './user.router';
import { authenticate } from 'passport';

const router: Router = Router();

router.use('/admins', admin);
router.use('/users', user);

router.head(
	'/token',
	authenticate('token', {session: false}),
	(_, res) => {
		res.sendStatus(200);
	},
);

export default router;
