
import { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Request } from 'express';
import { ResponseError } from '@src/utils';
import { LOGIN, ACCOUNT } from '@src/constants';
import { AdminModel } from '@app/api/admin/admin.model';
import { sessionService } from '@app/api/session/session.service';
import { IAdminDocument } from '@app/api/admin/admin.interface';
import { AccountType } from '@app/api/session/session.interface';
import { IUserDocument } from '@app/api/user/user.interface';
import { UserModel } from '@app/api/user/user.model';
import { DAO } from '@src/database';

use(
	'admin-login',
	new LocalStrategy({
		passReqToCallback: true,
		passwordField: 'password',
		usernameField: 'email',
	}, async (req: Request, email, password, done) => {
		try {
			const admin: IAdminDocument = await DAO.signin(AdminModel, {email}, password);
			if (!admin) {
				return done(new ResponseError(401, ACCOUNT.NOT_FOUND));
			}
			const result = await sessionService.create(req, {
				_id: admin._id,
				type: AccountType.Admin,
			});
			done(null, result, {message: LOGIN.SUCCESS});
		} catch (error) {
			done(error);
		}
	},
));

use(
	'user-login',
	new LocalStrategy({
		passReqToCallback: true,
		passwordField: 'password',
		usernameField: 'email',
	}, async (req: Request, email, password, done) => {
		try {
			const user: IUserDocument = await DAO.signin(UserModel, {email}, password);
			if (!user) {
				return done(new ResponseError(401, ACCOUNT.NOT_FOUND));
			}
			const result = await sessionService.create(req, {
				_id: user._id,
				type: AccountType.User,
			});
			done(null, result, {message: LOGIN.SUCCESS});
		} catch (error) {
			done(error);
		}
	},
));

// Console.info('Login Strategy Started');
