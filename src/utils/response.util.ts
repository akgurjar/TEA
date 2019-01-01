/// <reference path="../../typings/Index.ts" />

import { Response } from "express";

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

