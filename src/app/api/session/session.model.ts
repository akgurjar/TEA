import { Schema, Model, model, Types } from 'mongoose';
import { ISessionDocument, AccountType } from './session.interface';

const sessionSchema = new Schema({
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
			enum: [
				AccountType.Admin,
				AccountType.User,
			],
			required: true,
			type: String,
		},
	},
	// tslint:disable-next-line: object-literal-sort-keys
	createdAt: Date,
	updatedAt: Date,
}, {
	collection: 'sessions',
	timestamps: true,
});

export const SessionModel: Model<ISessionDocument> = model('sessions', sessionSchema);
