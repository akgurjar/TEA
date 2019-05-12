import { Schema } from 'mongoose';
// import * as Service from '../../service';

export const sessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    userFrom: {
        type: String,
        required: true
    },
	clientAgent: {
        type: String,
        required: true
	},
	clientIPAddr: {
		type: String,
		required: true,
	},
	clientProxy: {
		type: String,
		required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
	collection: 'sessions',
	timestamps: true,
});

// adminSchema.methods.verifyPassword = Service.verifyPassword;
// adminSchema.methods.existsId = Service.existsId;
// adminSchema.methods.exists = Service.exists;

// adminSchema.pre('save', Service.passwordHook);
