/// <reference path="../../typings/Index.ts" />



export class ErrorResponse {
    statusCode: number;
    message: string;
    constructor(info: App.ErrorResponseInfo) {
        this.statusCode = info.statusCode || 500;
        this.message = info.message;
    }
}