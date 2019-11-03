import { Document } from 'mongoose';

export interface IUser {
	email: string;
	password: string;
	pictureUrl?: string;
	displayName: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
	verifyPassword(password: string): Promise<boolean>;
}
