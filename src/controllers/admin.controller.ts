import { Response, Request, NextFunction } from "express";
import { ResponseError, Respond } from "../utils";
import { authenticate } from "passport";
import { TOKEN, ACCOUNT } from "../constants";
// import { ERROR } from "../constants";
import { Admin } from "../models/admin";
import * as Service from "../service";

export const adminController = {
	login(req: Request, res: Response, next: NextFunction) {
		const respond = new Respond(res);
		authenticate("admin-login", (error: ResponseError, token, info) => {
			if (error) {
				respond.error(error);
			} else {
				respond.success(info.message, token);
			}
		})(req, res, next);
	},
	validateToken(req: Request, res: Response) {
		res.sendStatus(200);
	},
	fetchProfile(req: Request, res: Response) {
		const respond = new Respond(res);
		if (req.user && req.user.ref === "admins") {
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
