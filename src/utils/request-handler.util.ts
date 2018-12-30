/// <reference path="../../typings/Index.ts" />

import { Response, Request, NextFunction } from "express";
import { JoiObject, validate } from "joi";

type DataResolver = string | ((req: Request) => any);


export const RequestHandler = {
    validate(schema: JoiObject, dataResolver: DataResolver){
        return (req: Request, res: Response, next: NextFunction) => {
            // console.log('Validating Schema');
            let data = null;

            if (typeof dataResolver === 'function') {
                data = dataResolver(req);
            } else {
                data = req[dataResolver];
            }
            validate(data, schema)
                .then((validatedData) => {
                    req['data'] = validatedData;
                    next();
                }).catch((error) => {
                    const message = error.details[0].message.split('"').join("");
                    this.respond(res, { message, statusCode: 400 });
                });
        }
    },
    respond(res: Response, meta: App.MetaResponse, result: any = null) {
        res.status(meta.statusCode || 500)
        .json({
            errorCode: meta.errorCode,
            message: meta.message,
            result
        });
    },
    bindResponse(res: Response): (meta: App.MetaResponse, result?: any) =>void {
        return this.respond.bind(this, res);
    }
};

