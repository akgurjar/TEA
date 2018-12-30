import { Response } from "express";
import { admin } from '../services/admin.service';
import { ErrorResponse, RequestHandler } from "../utils";

export const adminController = {
    login(req: App.IRequest<Admin.Credentials>, res: Response) {
        const respond = RequestHandler.bindResponse(res);
        admin.authenticate(req.data.username, req.data.password)
        .then(token => {
            if (token) {
                respond({
                    statusCode: 200,
                    message: 'Welcome! Login Seccussfull.'
                }, {token});
            }
        }).catch((error: ErrorResponse) => {
            respond(error);
        });
    }
};