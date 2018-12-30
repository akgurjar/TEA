import { Response, Request } from "express";
import { admin } from '../services/admin.service';
import { ErrorResponse, RequestHandler } from "../utils";
import { LOGIN } from '../constants';

export const adminController = {
    login(req: App.IRequest<Admin.Credentials>, res: Response) {
        const respond = RequestHandler.bindResponse(res);
        admin.authenticate(req.data.username, req.data.password)
        .then(token => {
            if (token) {
                respond({
                    statusCode: 200,
                    message: LOGIN.SUCCESS
                }, {token});
            }
        }).catch((error: ErrorResponse) => {
            respond(error);
        });
    },
    validateToken(req: Request, res: Response) {
        res.sendStatus(200);
    }
};