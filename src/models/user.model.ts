
import { Typegoose, prop } from 'typegoose';
// import { passwordHook } from '../services';

// @pre<Admin>('save', passwordHook)
class User extends Typegoose {
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
}


export default new User().getModelForClass(User);