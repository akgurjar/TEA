
import { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Admin } from '../models/admin';
import { LOGIN } from '../constants';
import { ResponseError, Console } from '../utils';
import * as Service from '../service';
import { Request } from 'express';

use(
	'admin-login',
	new LocalStrategy({
		passReqToCallback: true,
		passwordField: 'password',
		usernameField: 'email',
	}, (req: Request, email, password, done) => {
		Service.authToken(Admin, {email}, password, req).then((token: string) => {
			done(null, token, {message: LOGIN.SUCCESS});
		}).catch((error: ResponseError) => {
			done(error);
		});
	},
));

Console.info('Login Strategy Started');
