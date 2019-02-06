


declare namespace App {
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
    export interface Bootstrap {
        init() : Promise<void>;
        bootstrapAdmin(): Promise<void>;
        bootstrapCounters(): Promise<void>;
    }
}

