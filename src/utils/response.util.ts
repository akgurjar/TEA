
import { Response } from "express";
import { ResponseError } from "./error.util";

export class Respond {
    static success(res: Response, message: string, result: any) {
        res.json({message, result});
    }
    static error(res: Response, {status, message}: ResponseError) {
        res.status(status || 500).json({ message, errorCode: 0 });
    }
    constructor(private res: Response) {
        //
    }
    success(message: string, result: any) {
        this.res.json({message, result});
    }
    error({status, message}: ResponseError) {
        this.res.status(status || 500).json({ message, errorCode: 0 });
    }
}

export function respond(res: Response, meta: App.MetaResponse, result: any = null) {
    res.status(meta.statusCode || 500)
    .json({
        errorCode: meta.errorCode,
        message: meta.message,
        result
    });
}
export function bindResponse(res: Response): (meta: App.MetaResponse, result?: any) =>void {
    return respond.bind(this, res);
}

