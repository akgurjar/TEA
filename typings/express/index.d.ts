/// <reference types="Express" />

declare module Express {
    export enum UserType {
        Admin = 'ADMIN',
        Client = 'CLIENT',
    }
    export interface User {
        _id: string;
        type: UserType;
    }
    export interface Client {
        agent: string;
        ipAddr: string;
        proxy: string;
    }
    export interface Request<T = any> {
        data?: any;
        user?: User;
        client?: Client;
    }
}