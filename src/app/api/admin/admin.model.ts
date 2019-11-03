import { Schema, Model, model } from 'mongoose';
import { IAdminDocument } from './admin.interface';
import { passwordUtil } from '@src/utils/password.util';

const adminSchema = new Schema({
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
	collection: 'admins',
	timestamps: true,
});

adminSchema.methods.verifyPassword = passwordUtil.verify;

adminSchema.pre('save', function(this: IAdminDocument) {
	// Call Password Hook
	passwordUtil.hook.call(this);
});

export const AdminModel: Model<IAdminDocument> = model('admins', adminSchema);
