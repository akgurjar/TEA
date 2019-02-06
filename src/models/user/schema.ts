import { Schema } from "mongoose";
import * as Service from '../../service';


export const userSchema = new Schema({
    uniqueId: {
        type: String,
        default: 'USER'
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    displayName: {
        type: String
    },
    photoUrl: {
        type: String
    }
}, {
    collection: 'users'
});

userSchema.methods.verifyPassword = Service.verifyPassword;
userSchema.methods.existsId = Service.existsId;
userSchema.methods.exists = Service.exists;

userSchema.pre('save', Service.passwordHook);