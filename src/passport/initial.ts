
import { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Types } from 'mongoose';
import Admin from '../models/admin.model';
import { LOGIN } from '../constants';
import { environment, ErrorResponse } from '../utils';
import { admin } from '../services/admin.service';

use('admin-login', new LocalStrategy(
    function(email, password, done) {
        admin.token(email, password).then(function (token: string) {
            done(null, token, {message: LOGIN.SUCCESS});
        }).catch(function (error: ErrorResponse) {
            done(error);
        });
    }
));


use('admin-token', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: environment.TOKEN_SECRET
}, function(payload, done) {
    Admin.countDocuments({_id: new Types.ObjectId(payload._id)}).exec().then(function(count) {
        if (count) {
            return done(null, payload._id, {message: 'Token Verified.'});
        } else {
            return done(null, false, {message: 'Account not found!'});
            // or you could create a new account
        }
    }).catch(function(err) {
        done(err, false, {message: 'Internal Server Error!'});
    });
}));

