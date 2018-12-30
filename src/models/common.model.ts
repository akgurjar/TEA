
import { prop, Typegoose, instanceMethod, pre, staticMethod, ModelType } from 'typegoose';
import { environment, ErrorResponse, genToken } from '../utils';
import { compare, hash, genSalt } from 'bcrypt';
import { LOGIN, ACCOUNT } from '../constants';


function passwordHook(this: Common, next: () => void) {
  (async () => {
    this.password = await hash(this.password, await genSalt(environment.SALT_ROUND));
  })().then(next).catch((error) => {
    console.log(error);
  });
}


@pre<Common>('save', passwordHook)
export class Common extends Typegoose {
  @prop({
    required: true
  })
  password: string;
  @instanceMethod
  async verifyPassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
  @staticMethod
  static async token(model: ModelType<Common> & typeof Common, query: {[key: string]: any}, password: string): Promise<string> {
    const document: Common = await model.findOne(query, {password: true});
    if (document) {
      if (await document.verifyPassword(password)) {
        return genToken({_id: document['_id']});
      }
      throw(new ErrorResponse({statusCode: 401, message: LOGIN.FAILED}));
    } else {
      throw(new ErrorResponse({statusCode: 401, message: ACCOUNT.NOT_FOUND}));
    }
  }
}