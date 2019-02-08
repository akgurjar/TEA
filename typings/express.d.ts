/// <reference types="Express" />

declare namespace Express {
	export interface Request {
		data: any;
	}
	export type App = Express.Application;
}