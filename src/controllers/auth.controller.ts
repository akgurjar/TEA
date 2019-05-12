import { Request, Response, NextFunction } from "express";

import * as Service from '@src/service';
import { Respond } from "@src/utils";


export const authController = {
    async success(req: Request, res: Response, next: NextFunction) {
        res.sendStatus(200);
    },
    async refreshToken(req: Request, res: Response, next: NextFunction) {
        Service.refreshToken(req.data.refreshToken).then((authToken) => {
            Respond.success(res, 'Token generated Successfully', authToken);
        }).catch(next);
    },
    async logout(req: Request, res: Response, next: NextFunction) {
        res.sendStatus(200);
    }
};