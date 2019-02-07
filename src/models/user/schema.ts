import { Schema, Document } from "mongoose";
import * as Service from '../../service';


export const userSchema = new Schema({
    uniqueId: {
        type: String,
        default: null
    },
    email: {
        required: true,
        type: String,
        unique: true
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
    },
    dob: {
        type: Date
    },
    status: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    }
}, {
    collection: 'users'
});

userSchema.methods.verifyPassword = Service.verifyPassword;
userSchema.methods.existsId = Service.existsId;
userSchema.methods.exists = Service.exists;

userSchema.pre('save', function(this: Document, next: () => void) {
    Service.passwordHook.call(this).then(() => {
        if (!this['uniqueId']) {
            this['uniqueId'] = `USR${++global.counters.user}`;
        }
        next();
    })
});