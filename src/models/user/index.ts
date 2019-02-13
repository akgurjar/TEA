import { Model, model } from 'mongoose';
import { UserDocument } from './user.document';
import { userSchema } from './user.schema';

export const User: Model<UserDocument> = model('users', userSchema);
