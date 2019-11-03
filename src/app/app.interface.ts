// import {}

export namespace App {
	export interface Singleton<T> {
		instance: T;
		init(this: Singleton<T>): Promise<void>;
		initViewEngine(this: Singleton<T>): void;
		initDatabase(this: Singleton<T>): Promise<void>;
		initConfig(this: Singleton<T>): void;
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
	export interface Bootstrap {
		init(): Promise<void>;
		bootstrapAdmin(): Promise<void>;
		bootstrapCounters(): Promise<void>;
	}
	export interface AuthorizedUser {
		_id: string;
		ref: string;
	}
	export interface TokenPayload extends AuthorizedUser {
		iat: number;
	}

	export type MailType = 'forgot' | 'verify';
	export interface Mailer {
		account: any;
		init(): Promise<void>;
		transporter: any;
		sendMail(type: MailType, to: string): Promise<void>;
		genTemplate(name: string, data: any): Promise<string>;
	}
}
