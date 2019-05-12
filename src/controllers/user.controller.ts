import { Response, Request, NextFunction } from 'express';
import { Respond, ResponseError, Console } from '@src/utils';
// import { authenticate } from 'passport';
import { User } from '@src/models/user';
import * as Service from '@src/service';
import { ACCOUNT, TOKEN } from '@src/constants';

export const userController = {
	async sendOtp(req: Request, res: Response, next: NextFunction) {
		const { mobile, countryCode } = req.data as Api.UserSignInData;
		try {
			const result = await Service.sendSignInOtp(mobile, countryCode);
			Respond.success(res, 'OTP message sent successfully', result.uniqueId);
		} catch(err) {
			next(err);
		}
	},
	async verifyOtp(req: Request, res: Response, next: NextFunction) {
		const { id, otp } = req.data as Api.UserVerificationData;
		try {
			const result = await Service.verifyUser(id, otp, req);
			Respond.success(res, '', result);
		} catch(err) {
			next(err);
		}
	},
	// async login(req: Request, res: Response, next: NextFunction) {
	// 	const { mobile } = req.data as Api.UserSignInData;
	// 	try {
	// 		const result = await Service.signIn(User, {mobile}, req);
	// 		Respond.success(res, 'Login Successfully', result);
	// 	} catch(error) {
	// 		next(error);
	// 	}
	// },
	async validateToken(req: Request, res: Response) {
		res.sendStatus(200);
	},
	async fetchProfile(req: Request, res: Response) {
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
	async fetchDetails(req: Request, res: Response) {
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
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			console.log(req.data);
			const status = await Service.save(User, req.data);
			if (status) {
				Respond.success(res, ACCOUNT.CREATED, null);
			}
		} catch (error) {
			next(error);
		}
		// .then((status: boolean) => {
		// 	if (status) {
		// 		// console.log(status);
		// 	}
		// }).catch((error: any) => {
		// 	// console.log(error);
		// 	Respond.error(res, new ResponseError(500, ERROR.INTERNAL));
		// });
	},
	async list(req: Request, res: Response) {
		console.log(req.data);
		const respond = new Respond(res);
		Service.list(User, req.data).then((result) => {
			respond.success('List Fetch Successfully', result);
		}).catch((error: ResponseError) => {
			Console.error(error);
		});
		// res.send('Listing');
	},
	async update(req: Request, res: Response) {}
};
