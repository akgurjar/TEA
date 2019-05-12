import { Document } from 'mongoose';


export interface SessionDocument extends Document {
    user: string,
    userFrom: string;
	clientAgent: string,
	clientIPAddr: string,
	clientProxy: string,
	createdAt: Date;
	updatedAt: Date;
}