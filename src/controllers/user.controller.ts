import { Response, Request, NextFunction } from "express";
// import { Respond, ResponseError } from "../utils";
// import { authenticate } from 'passport';
// import User from "../models/user";
// import { ACCOUNT, ERROR } from "src/constants";
// import { ERROR, ACCOUNT } from '../constants';

export const userController = {
    create(req: Request, res: Response, next: NextFunction) {
        // User.add(req.data).then((status: boolean) => {
        //     if (status) {
        //         // console.log(status);
        //         Respond.success(res, ACCOUNT.CREATED, null);
        //     }
        // }).catch((error: any) => {
        //     // console.log(error);
        //     Respond.error(res, new ResponseError(500, ERROR.INTERNAL));
        // });
    },
    validateToken(req: Request, res: Response) {
        res.sendStatus(200);
    }
};