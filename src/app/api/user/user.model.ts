import { Schema, model } from 'mongoose';
import { passwordUtil } from '#utils/password.util';

const userSchema = new Schema(
	{
		name: {
			required: true,
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
		pictureUrl: {
			type: String,
		},
		createdAt: Date,
		updatedAt: Date,
	},
	{
		collection: 'users',
		timestamps: true,
	},
);

userSchema.methods.verifyPassword = passwordUtil.verify;

userSchema.pre('save', function (this: IUser.Doc) {
	// Call Password Hook
	passwordUtil.hook.call(this);
});

export const UserModel = model('users', userSchema);

export type Model = typeof UserModel;
