import { JoiObject, validate } from "joi";
import { Request, Response, NextFunction } from "express";
import { respond } from "../utils";
type DataResolver = string | ((req: Request) => any);

export function validateSchema(schema: JoiObject, dataResolver: DataResolver){
    return (req: Request, res: Response, next: NextFunction) => {
        // console.log('Validating Schema');
        const data = typeof dataResolver === 'function' ? dataResolver(req) : req[dataResolver];

        validate(data, schema)
        .then((validatedData) => {
            req['data'] = validatedData;
            next();
        }).catch((error) => {
            const message = error.details[0].message.split('"').join("");
            respond(res, { message, statusCode: 400 });
        });
    }
}