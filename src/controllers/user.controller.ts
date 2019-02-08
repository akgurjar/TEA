import { Response, Request, NextFunction } from "express";
import { Respond, ResponseError } from "../utils";
import { authenticate } from "passport";
import { User } from "../models/user";
import { save } from "../service";
import { ERROR, ACCOUNT } from "../constants";

export const userController = {
	login(req: Request, res: Response, next: NextFunction) {
		const respond = new Respond(res);
		authenticate("user-login", (error: ResponseError, token, info) => {
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
		// const respond = new Respond(res);
		// Admin.details(req.user).then(result => {
		//     respond.success("", result);
		// }).catch((err: ResponseError) => {
		//     respond.error(err);
		// });
	},
	create(req: Request, res: Response, next: NextFunction) {
		save(User, req.data).then((status: boolean) => {
			if (status) {
				// console.log(status);
				Respond.success(res, ACCOUNT.CREATED, null);
			}
		}).catch((error: any) => {
			// console.log(error);
			Respond.error(res, new ResponseError(500, ERROR.INTERNAL));
		});
	},
};
