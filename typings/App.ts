


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
    export interface Pagination {
        pageSize: number;
        pageIndex: number;
    }
    export interface Listing extends Pagination {
        searchText?: string;
        [key: string]: any;
    }
}

