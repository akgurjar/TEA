/// <reference types="Express" />
/// <reference path="app.d.ts" />

declare namespace Express {
	export interface ClientData {
		clientAgent: string;
		clientIPAddr: string;
		clientProxy: string;
	}
	export interface Request {
		data?: any;
		user?: App.AuthorizedUser;
		client?: ClientData;
	}
	export type App = Express.Application;
}