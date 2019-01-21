


declare namespace App {
    export interface IRequest<Data> {
        data?: Data;
    }
    export interface MetaResponse {
        statusCode: number;
        errorCode?: number;
        message: string;
    }
    
    export interface ErrorResponseInfo {
        statusCode?: number;
        message: string;
    }
    export interface PaginateOptions {
        pageIndex: number;
        pageSize: number
    }
}
// declare class ResponseError extends Error {
//     constructor(public status: number, message: string) {
//         super(message);
//     }
// } 

