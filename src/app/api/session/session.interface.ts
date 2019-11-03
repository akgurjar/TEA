import { Document, Types } from 'mongoose';

export enum AccountType {
	User = 'User',
	Admin = 'Admin',
}

export interface IClient {
	agent: string;
	proxy: string;
	ipAddr: string;
}

export interface ISessionUser {
	_id: Types.ObjectId;
	type: AccountType;
}

export interface ISession {
	user: ISessionUser;
	client: IClient;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISessionDocument extends ISession, Document {
}

export interface ISessionToken {
	authToken: string;
	refreshToken: string;
}
