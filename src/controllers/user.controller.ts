import { Response, Request, NextFunction } from "express";
import { bindResponse } from "../utils";
// import { authenticate } from 'passport';
import { user } from "../services/user.service";
import { ERROR, ACCOUNT } from '../constants';

export const userController = {
    create(req: Request, res: Response, next: NextFunction) {
        const response = bindResponse(res);   
        user.create(req.data).then((status: boolean) => {
            if (status) {
                console.log(status);
                response({statusCode: 200, message: ACCOUNT.CREATED});
            }
        }).catch((error: any) => {
            console.log(error);
            response({statusCode: 500, message: ERROR.INTERNAL});
        });
    },
    validateToken(req: Request, res: Response) {
        // console.log(req.user);
        console.log(req.data);
        res.sendStatus(200);
    }
};