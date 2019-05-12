
import { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Admin, User } from '@src/models';
import { LOGIN } from '@src/constants';
import { ResponseError } from '@src/utils';
import * as Service from '@src/service';
import { Request } from 'express';

use(
	'admin-login',
	new LocalStrategy({
		passReqToCallback: true,
		passwordField: 'password',
		usernameField: 'email',
	}, (req: Request, email, password, done) => {
		Service.signIn(Admin, {email}, password, req).then((result: Api.SignInResult) => {
			done(null, result, {message: LOGIN.SUCCESS});
		}).catch((error: ResponseError) => {
			done(error);
		});
	},
));

use(
	'user-login',
	new LocalStrategy({
		passReqToCallback: true,
		passwordField: 'password',
		usernameField: 'email',
	}, (req: Request, email, password, done) => {
		Service.signIn(User, {email}, password, req).then((result: Api.SignInResult) => {
			done(null, result, {message: LOGIN.SUCCESS});
		}).catch((error: ResponseError) => {
			done(error);
		});
	},
));

// Console.info('Login Strategy Started');
