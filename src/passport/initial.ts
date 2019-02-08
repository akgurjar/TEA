
import { use } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Admin } from "../models/admin";
import { User } from "../models/user";
import { LOGIN } from "../constants";
import { environment, ResponseError } from "../utils";
import * as Service from "../service";
import { Request } from "express";

use(
	"admin-login",
	new LocalStrategy({
		passReqToCallback: true,
		passwordField: "password",
		usernameField: "email",
	}, (req: Request, email, password, done) => {
		Service.authToken(Admin, {email}, password, req).then((token: string) => {
			done(null, token, {message: LOGIN.SUCCESS});
		}).catch((error: ResponseError) => {
			done(error);
		});
	},
));

use(
	"user-login",
	new LocalStrategy({
		passReqToCallback: true,
		passwordField: "password",
		usernameField: "email",
	}, (req: Request, email, password, done) => {
		Service.authToken(User, {email}, password, req).then((token: string) => {
			done(null, token, {message: LOGIN.SUCCESS});
		}).catch((error: ResponseError) => {
			done(error);
		});
	},
));

use("admin-token", new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: environment.TOKEN_SECRET,
}, (payload, done) => {
	Service.exists(Admin, payload._id).then((status) => {
		if (status) {
			return done(null, payload._id, {message: "Token Verified."});
		} else {
			return done(null, false, {message: "Account not found!"});
			// or you could create a new account
		}
	}).catch((err) => {
		done(err, false, {message: "Internal Server Error!"});
	});
}));

use("user-token", new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: environment.TOKEN_SECRET,
}, (payload, done) => {
	Service.exists(User, payload._id).then((status) => {
		if (status) {
			return done(null, payload._id, {message: "Token Verified."});
		} else {
			return done(null, false, {message: "Account not found!"});
			// or you could create a new account
		}
	}).catch((err) => {
		done(err, false, {message: "Internal Server Error!"});
	});
}));
