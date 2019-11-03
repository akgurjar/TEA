
import { use } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
// import { Admin } from '../models/admin';
// import { User } from '../models/user';
import { TOKEN } from '../constants';
import { environment, Console, ResponseError } from '@src/utils';
// import * as Service from '../service';
// import { Request } from 'express';
// import { Model } from 'mongoose';
import { App } from '@app/app.interface';

use('token', new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// passReqToCallback: true,
	secretOrKey: environment.AUTH_TOKEN_SECRET,
}, ({_id, ref}: App.TokenPayload, done: VerifiedCallback) => {
	if (_id && ref) {
		return done(null, {_id, ref}, {message: TOKEN.VALID});
	}
	done(new ResponseError(401, TOKEN.INVALID), false, {message: TOKEN.INVALID});
}));

Console.info('Token Strategy Started');
