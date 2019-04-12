/// <reference types="Express" />
/// <reference path="app.d.ts" />

declare namespace Express {
	export interface Request {
		data?: any;
		user?: App.AuthorizedUser;
	}
	export type App = Express.Application;
}