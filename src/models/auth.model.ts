
import { prop, instanceMethod, pre, staticMethod, ModelType } from 'typegoose';
import { environment, ResponseError, genToken } from '../utils';
import { compare, hash, genSalt } from 'bcrypt';
import { LOGIN, ACCOUNT } from '../constants';
import { Common } from './common.model';

function passwordHook(this: Auth, next: () => void) {
  (async () => {
    this.password = await hash(this.password, await genSalt(environment.SALT_ROUND));
  })().then(next).catch((error) => {
    console.log(error);
  });
}


@pre<Auth>('save', passwordHook)
export class Auth extends Common {
  @prop({
    required: true
  })
  password: string;
  @instanceMethod
  async verifyPassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
  @staticMethod
  static async token(model: ModelType<Auth> & typeof Auth, query: {[key: string]: any}, password: string): Promise<string> {
    const document: Auth = await model.findOne(query, {password: true});
    if (document) {
      if (await document.verifyPassword(password)) {
        return genToken({_id: document['_id']});
      }
      throw(new ResponseError(401, LOGIN.FAILED));
    } else {
      throw(new ResponseError(401, ACCOUNT.NOT_FOUND));
    }
  }
}