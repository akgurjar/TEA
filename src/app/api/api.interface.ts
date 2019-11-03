import * as express from 'express';
import { UserType } from '@constants/user.constants';
import { ResponseError } from '@src/utils';
import { JoiObject } from 'joi';

export namespace Api {
	export interface ListingResult {
		pageIndex: number;
		pageSize: number;
		total: number;
		data: any[];
	}
	// export interface OtpSenderData {}
	export interface UserSignInData {
		countryCode: string;
		mobile: string;
	}
	export interface UserVerificationData {
		id: string;
		otp: string;
	}
	export interface SignInResult {
		authToken: string;
		refreshToken: string;
	}
	export interface Client {
		agent: string;
		ipAddr: string;
		proxy: string;
	}
	export interface User {
		_id: string;
		type: UserType;
	}
	export interface Request<T = any> extends express.Request {
		data?: T;
		user?: User;
		client?: Client;
	}
	export interface Response extends express.Response {
		error(error: ResponseError): void;
		success(message: string, result?: any): void;
	}
	// export interface EntityOptions {
	// 	auth?: UserType | UserType[];
	// 	schema?: JoiObject;
	// }
	// export interface EntityCustomOptions {}
}
