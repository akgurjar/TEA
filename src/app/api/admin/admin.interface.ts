import { Document } from 'mongoose';

export interface IAdmin {
	email: string;
	password: string;
	pictureUrl?: string;
	displayName: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAdminDocument extends IAdmin, Document {
	verifyPassword(password: string): Promise<boolean>;
}
