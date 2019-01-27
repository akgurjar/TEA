
import { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Admin } from '../models/admin';
import { LOGIN } from '../constants';
import { environment, ResponseError } from '../utils';
import * as Service from '../service';

use('admin-login', new LocalStrategy(
    function(email, password, done) {
        console.log(email, password);
        Service.authToken(Admin, {email}, password).then(function (token: string) {
            done(null, token, {message: LOGIN.SUCCESS});
        }).catch(function (error: ResponseError) {
            console.log(error);
            done(error);
        });
    }
));


use('admin-token', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: environment.TOKEN_SECRET
}, function(payload, done) {
    Service.exists(Admin, payload._id).then((status) => {
        if (status) {
            return done(null, payload._id, {message: 'Token Verified.'});
        } else {
            return done(null, false, {message: 'Account not found!'});
            // or you could create a new account
        }
    }).catch(function(err) {
        done(err, false, {message: 'Internal Server Error!'});
    });
}));

