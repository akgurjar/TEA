import { Document } from 'mongoose';

export interface LoginDetail {
	clientAgent: string;
	clientIPAddr: string;
	clientProxy: string;
	loginDate: Date;
}

export interface AdminDocument extends Document {
	email: string;
	password: string;
	displayName?: string;
	photoUrl?: string;
	loginDetails: LoginDetail[];
	createdAt: Date;
	updatedAt: Date;
	verifyPassword(password: string): Promise<boolean>;
}