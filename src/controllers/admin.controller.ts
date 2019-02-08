import { Response, Request, NextFunction } from "express";
import { ResponseError, Respond } from "../utils";
import { authenticate } from "passport";
// import { ERROR } from "../constants";
// import Admin from "../models/admin";
// import User from "../models/user";

export const adminController = {
	login(req: Request, res: Response, next: NextFunction) {
		const respond = new Respond(res);
		authenticate("admin-login", (error: ResponseError, token, info) => {
			if (error) {
				respond.error(error);
			} else {
				respond.success(info.message, {token});
			}
		})(req, res, next);
	},
	validateToken(req: Request, res: Response) {
		// console.log(req.user);
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
};
