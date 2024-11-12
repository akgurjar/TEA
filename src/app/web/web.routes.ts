import { Router, Request, Response } from 'express';

export const router = Router();

router
	.route('/authorize')
	.get((req: Request, res: Response) => {
		if (req.cookies['session']) {
			res.redirect('/');
		} else {
			res.render('login', {
				isLogin: false,
				errors: {},
			});
		}
	})
	.post((req: Request, res: Response) => {
		const { email, password } = req.body;
		if (!email || !password) {
			const errors: Record<string, string> = {};
			if (!email) {
				errors.email = 'Email is required';
			}
			if (!password) {
				errors.password = 'Password is required';
			}
			return res.render('login', { isLogin: false, errors });
		} else if (email !== 'admin@tea.com' || password !== 'admin@tea') {
			console.log(email, password);
			return res.render('login', {
				isLogin: false,
				errors: {
					common: 'Invalid credentials',
				},
			});
		}
		res.cookie('session', '123');
		res.redirect('/');
	});
router.route('/').get((req: Request, res: Response) => {
	console.log(req.cookies);
	if (req.cookies['session']) {
		res.render('home', {
			isLogin: true,
		});
	} else {
		res.redirect('/authorize');
	}
});

router.get('/logout', (req: Request, res: Response) => {
	res.clearCookie('session');
	res.redirect('/authorize');
});
