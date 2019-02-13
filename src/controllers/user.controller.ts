import { Response, Request, NextFunction } from 'express';
import { Respond, ResponseError, Console } from '../utils';
import { authenticate } from 'passport';
import { User } from '../models/user';
import * as Service from '../service';
import { ERROR, ACCOUNT, TOKEN } from '../constants';

export const userController = {
	login(req: Request, res: Response, next: NextFunction) {
		const respond = new Respond(res);
		authenticate('user-login', (error: ResponseError, token, info) => {
			if (error) {
				respond.error(error);
			} else {
				respond.success(info.message, {token});
			}
		})(req, res, next);
	},
	validateToken(req: Request, res: Response) {
		res.sendStatus(200);
	},
	fetchProfile(req: Request, res: Response) {
		const respond = new Respond(res);
		if (req.user && req.user.ref === 'users') {
			Service.details(User, req.user._id)
			.then((result) => {
				respond.success(ACCOUNT.DETAILS, result);
			}).catch((err: ResponseError) => {
				respond.error(err);
			});
		} else {
			respond.error(new ResponseError(401, TOKEN.INVALID));
		}
	},
	fetchDetails(req: Request, res: Response) {
		const respond = new Respond(res);
		if (req.user && req.user.ref === 'admins') {
			Service.details(User, req.data.id)
			.then((result) => {
				respond.success(ACCOUNT.DETAILS, result);
			}).catch((err: ResponseError) => {
				respond.error(err);
			});
		} else {
			respond.error(new ResponseError(401, TOKEN.INVALID));
		}
	},
	create(req: Request, res: Response, next: NextFunction) {
		Service.save(User, req.data).then((status: boolean) => {
			if (status) {
				// console.log(status);
				Respond.success(res, ACCOUNT.CREATED, null);
			}
		}).catch((error: any) => {
			// console.log(error);
			Respond.error(res, new ResponseError(500, ERROR.INTERNAL));
		});
	},
	list(req: Request, res: Response) {
		console.log(req.data);
		const respond = new Respond(res);
		Service.list(User, req.data).then((result) => {
			respond.success('List Fetch Successfully', result);
		}).catch((error: ResponseError) => {
			Console.error(error);
		});
		// res.send('Listing');
	},
};
