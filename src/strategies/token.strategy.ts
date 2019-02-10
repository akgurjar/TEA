
import { use } from "passport";
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { Admin } from "../models/admin";
import { User } from "../models/user";
import { ERROR, ACCOUNT, TOKEN } from "../constants";
import { environment, Console } from "../utils";
import * as Service from "../service";
import { Request } from "express";
import { Model } from "mongoose";

use("token", new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	passReqToCallback: true,
	secretOrKey: environment.TOKEN_SECRET,
}, (req: Request, {_id, ref}: App.TokenPayload, done: VerifiedCallback) => {
	let Collection: Model<any>;
	if (ref === "admins") {
		Collection = Admin;
	}
	if (ref === "users") {
		Collection = User;
	}
	if (!Collection) {
		return done(new Error(ERROR.INTERNAL));
	}
	Service.existsId(Collection, _id).then((result) => {
		if (result) {
			return done(null, {_id, ref}, {message: TOKEN.VALID});
		}
		return done(null, false, {message: ACCOUNT.NOT_FOUND});
	}).catch((err) => {
		done(err, false, {message: ERROR.INTERNAL});
	});
}));

Console.info("Token Strategy Started");
