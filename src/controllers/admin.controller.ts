import { Response, Request, NextFunction } from "express";
import { ErrorResponse, bindResponse, respond } from "../utils";
import { authenticate } from 'passport';
import { admin, user } from "../services";
import { ERROR } from '../constants';

export const adminController = {
    login(req: Request, res: Response, next: NextFunction) {
        const respond = bindResponse(res);
        authenticate('admin-login', function(error: ErrorResponse, token, info) {
            if (error) {
                respond(error);
            } else {
                respond({
                    statusCode: 200,
                    message: info.message
                }, {token});
            }
        })(req, res, next);
    },
    validateToken(req: Request, res: Response) {
        // console.log(req.user);
        res.sendStatus(200);
    },
    fetchProfile(req: Request, res: Response) {
        admin.details(req.user).then(result => {
            respond(res, { statusCode: 200, message: 'Fetch SuccessFull'}, result);
        }).catch(err => {
            respond(res, {statusCode: 500, message: ERROR.INTERNAL });
        });
    },
    userList(req: Request, res: Response) {
        console.log(req.data);
        // res.send('listening');
        user.list(req.data).then(result => {
            console.log(result);
            respond(res, {statusCode: 200, message: 'Fetch Successfull'}, result);
        });
    }
};