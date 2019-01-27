import { Model, Document } from "mongoose";
import { genToken, ResponseError, environment } from '../utils';
import { LOGIN, ACCOUNT } from '../constants'
import { compare, genSalt, hash } from "bcrypt";

export async function authToken(model: Model<any>, query: {[key: string]: any}, password: string): Promise<string> {
    const document = await model.findOne(query)
    if (document) {
      if (await document.verifyPassword(password)) {
        return genToken({_id: document['_id']});
      }
      throw(new ResponseError(401, LOGIN.FAILED));
    } else {
      throw(new ResponseError(401, ACCOUNT.NOT_FOUND));
    }
}


export async function verifyPassword(this: Document, password: string): Promise<boolean> {
    return await compare(password, this['password']);
}

export async function passwordHook(this: Model<any>, next: () => void) {
    const password = this['password'];
    if (password) {
        this['password'] = await hash(password, await genSalt(environment.SALT_ROUND));
        next();
    }
}