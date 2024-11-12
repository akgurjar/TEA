declare namespace Express {
	export enum UserType {
		ADMIN = 'ADMIN',
		REGULAR = 'REGULAR',
	}
	export interface User {
		id: string;
		type: UserType;
	}
	export interface Client {
		proxy: string;
		agent?: string;
		ipAddr?: string;
	}
	export interface Request {
		data?: object;
		user?: User;
		client?: Client;
	}
	export interface Response {
		success(message: string, result?: unknown): void;
	}
}
