import { prop } from 'typegoose';
import { Common } from './common.model';

class Admin extends Common {
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