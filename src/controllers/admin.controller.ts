import { Response, Request, NextFunction } from 'express';
import { ResponseError, Respond, Mailer, Console } from '../utils';
import { authenticate } from 'passport';
import { TOKEN, ACCOUNT, ERROR } from '../constants';
// import { ERROR } from '../constants';
import { Admin } from '../models/admin';
import * as Service from '../service';

export const adminController = {
	login(req: Request, res: Response, next: NextFunction) {
		const respond = new Respond(res);
		authenticate('admin-login', (error: ResponseError, token, info) => {
			if (error) {
				console.log(error);
				respond.error(error);
			} else {
				respond.success(info.message, token);
			}
		})(req, res, next);
	},
	forgot(req: Request, res: Response, next: NextFunction) {
		const email = req.data.email;
		Service.getId(Admin, {email}).then((id: string) => {
			if (id) {
				//
			}
		}).catch(() => {
			Respond.error(res, new ResponseError(500, ERROR.INTERNAL));
		});
		Mailer​​.sendMail('forgot', email).then(() => {
			Respond.success(res, 'Success');
		}).catch((error) => {
			Console.info(error);
			Respond.error(res, error);
		});
	},
	fetchProfile(req: Request, res: Response) {
		const respond = new Respond(res);
		if (req.user && req.user.ref === 'admins') {
			Service.details(Admin, req.user._id)
			.then((result) => {
				respond.success(ACCOUNT.DETAILS, result);
			}).catch((err: ResponseError) => {
				respond.error(err);
			});
		} else {
			respond.error(new ResponseError(401, TOKEN.INVALID));
		}
	},
};
