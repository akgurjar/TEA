import { Schema } from "mongoose";
import * as Service from "../../service";

export const adminSchema = new Schema({
	createdOn: {
		default: new Date(),
		type: Date,
	},
	displayName: {
		type: String,
	},
	email: {
		required: true,
		type: String,
	},
	loginDetails: [{
		clientAgent: String,
		clientIPAddr: String,
		clientProxy: String,
		loginDate: Date,
	}],
	password: {
		required: true,
		type: String,
	},
	photoUrl: {
		type: String,
	},
	updatedOn: {
		default: new Date(),
		type: Date,
	},
}, {
	collection: "admins",
});

adminSchema.methods.verifyPassword = Service.verifyPassword;
adminSchema.methods.existsId = Service.existsId;
adminSchema.methods.exists = Service.exists;

adminSchema.pre("save", Service.passwordHook);
