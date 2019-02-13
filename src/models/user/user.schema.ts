import { Schema } from 'mongoose';
import * as Service from '../../service';

export const userSchema = new Schema({
	displayName: {
		type: String,
	},
	dob: {
		type: Date,
	},
	email: {
		required: true,
		type: String,
		unique: true,
	},
	password: {
		required: true,
		type: String,
	},
	photoUrl: {
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

userSchema.methods.verifyPassword = Service.verifyPassword;
userSchema.methods.existsId = Service.existsId;
userSchema.methods.exists = Service.exists;

userSchema.pre('save', function(this: any, next: () => void) {
	Service.passwordHook.call(this).then(() => {
		if (!this.uniqueId) {
			this.uniqueId = `USR${++global.counters.user}`;
		}
		next();
	});
});