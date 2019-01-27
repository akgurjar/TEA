
import { Typegoose, prop, instanceMethod } from 'typegoose';
import * as Service from '../service';

// @pre<Admin>('save', passwordHook)
class Admin extends Typegoose {
    @prop({
        required: true
    })
    email: string;
    @prop({
        required: true
    })
    password: string;
    @prop()
    photoUrl: string
    @prop()
    displayName: string
    @instanceMethod
    async verifyPassword(password: string) {
        return await Service.verifyPassword.call(this, password);
    }
}


export default new Admin().getModelForClass(Admin);