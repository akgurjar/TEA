import { Schema, Model, model, Types } from 'mongoose';
import { UserType } from '#app/app.constants';

const sessionSchema = new Schema(
	{
		client: {
			agent: String,
			ipAddr: String,
			proxy: String,
		},
		isActive: {
			default: true,
			required: true,
			type: Boolean,
		},
		user: {
			_id: {
				required: true,
				type: Types.ObjectId,
			},
			type: {
				enum: [UserType.Admin, UserType.Client],
				required: true,
				type: String,
			},
		},
		createdAt: Date,
		updatedAt: Date,
	},
	{
		collection: 'sessions',
		timestamps: true,
	},
);

export const SessionModel = model('sessions', sessionSchema);
