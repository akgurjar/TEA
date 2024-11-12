import { Schema, model } from 'mongoose';
import { passwordUtil } from '#utils/password.util';

const adminSchema = new Schema(
	{
		name: {
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
		collection: 'admins',
		timestamps: true,
	},
);

adminSchema.methods.verifyPassword = passwordUtil.verify;

adminSchema.pre('save', function (this: IAdmin.Doc) {
	// Call Password Hook
	passwordUtil.hook.call(this);
});

export const AdminModel = model('admins', adminSchema);

export type Model = typeof AdminModel;
