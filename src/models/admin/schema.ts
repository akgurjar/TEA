import { Schema } from "mongoose";
import * as Service from '../../service';


export const adminSchema = new Schema({
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
    collection: 'admins'
});

adminSchema.methods.verifyPassword = Service.verifyPassword;
adminSchema.methods.existsId = Service.existsId;
adminSchema.methods.exists = Service.exists;

adminSchema.pre('save', Service.passwordHook);