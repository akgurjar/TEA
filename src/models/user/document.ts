import { Document } from 'mongoose';


export interface UserDocument extends Document {
    uniqueId: string;
    email: string,
    password: string,
    displayName?: string,
    photoUrl?: string;
    verifyPassword(password: string): Promise<boolean>;
}

