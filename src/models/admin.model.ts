import { prop } from 'typegoose';
import { Auth } from './auth.model';

class Admin extends Auth {
  @prop({
    required: true
  })
  name: string;
  @prop({
    required: true
  })
  email: string;
  @prop({
    default: null
  })
  photo: string;
  // @staticMethod()
}
  
export default new Admin().getModelForClass(Admin);