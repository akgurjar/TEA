import { prop } from 'typegoose';
import { Auth } from './auth.model';

class User extends Auth {
    @prop({
        required: true,
        index: true
    })
    name: string;
    @prop({
        required: true,
        index: true
    })
    email: string;
    @prop({
        default: null
    })
    photo: string;
    @prop({
        default: 0
    })
    status: number;
    @prop({
        required: true
    })
    dob: Date;
    @prop({
        default: new Date().toUTCString()
    })
    createdOn: Date;
    @prop({
        default: new Date().toUTCString()
    })
    updatedOn: Date;
    // @staticMethod()
}
  
export default new User().getModelForClass(User);