import { Schema } from 'mongoose';
import * as Service from '@src/service';

export const userSchema = new Schema({
	displayName: {
		type: String,
	},
	displayPicture: {
		type: String,
	},
	mobile: {
		type: String,
		required: true
	},
	countryCode: {
		type: String,
		required: true
	},
	dob: {
		type: Date,
	},
	email: {
		type: String,
	},
	status: {
		default: 0,
		type: Number,
	},
	uniqueId: {
		default: null,
		type: String,
	},
}, {
	collection: 'users',
	timestamps: true,
});

// userSchema.methods.verifyPassword = Service.verifyPassword;
userSchema.methods.existsId = Service.existsId;
userSchema.methods.exists = Service.exists;
userSchema.index({mobile: 1, countryCode: 1});

userSchema.pre('save', function(this: any, next: () => void) {
	if (!this.uniqueId) {
		this.uniqueId = `USR${++global.counters.user}`;
	}
	next();
	// Service.passwordHook.call(this).then(() => {
	// });
});
