import { Document } from "mongoose";

export interface UserDocument extends Document {
	uniqueId: string;
	email: string;
	password: string;
	displayName?: string;
	photoUrl?: string;
	dob?: Date;
	status: number;
	createdOn: Date;
	updatedOn: Date;
	verifyPassword(password: string): Promise<boolean>;
}
