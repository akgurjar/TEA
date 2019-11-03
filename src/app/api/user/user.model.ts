import { Schema, Model, model } from 'mongoose';
import { IUserDocument } from './user.interface';
import { passwordUtil } from '@src/utils/password.util';

const userSchema = new Schema({
	displayName: {
		type: String,
	},
	email: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
	photoUrl: {
		type: String,
	},
	// tslint:disable-next-line: object-literal-sort-keys
	createdAt: Date,
	updatedAt: Date,
}, {
	collection: 'users',
	timestamps: true,
});

userSchema.methods.verifyPassword = passwordUtil.verify;

userSchema.pre('save', function(this: IUserDocument) {
	// Call Password Hook
	passwordUtil.hook.call(this);
});

export const UserModel: Model<IUserDocument> = model('users', userSchema);
