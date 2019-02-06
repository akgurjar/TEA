import { Model, Document } from "mongoose";
import { genToken, ResponseError, environment } from '../utils';
import { LOGIN, ACCOUNT } from '../constants'
import { compare, genSalt, hash } from "bcrypt";
import { Request } from "express";

export async function authToken(model: Model<any>, query: {[key: string]: any}, password: string, req?: Request): Promise<string> {
    let info: any;
    if (req) {
        let clientIPAddr: any, clientProxy: string, clientAgent: string = req.headers['user-agent'] || null;
        if (req.headers['via']) { // yes
            clientIPAddr = req.headers['x-forwarded-for'];
            clientProxy = req.headers['via'];
        } else { // no
            clientIPAddr = req.connection.remoteAddress;
            clientProxy = "none";
        }
        info = {
            clientAgent,
            clientProxy,
            clientIPAddr,
            loginDate: new Date()
        };
    }
    const document = await model.findOne(query);
    if (document) {
      if (await document.verifyPassword(password)) {
        if(info) {
            document.loginDetails.push(info);
            document.save();
        } 
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

export async function passwordHook(this: Document) {
    const password = this['password'];
    if (this.isModified('password')) {
        this['password'] = await hash(password, await genSalt(environment.SALT_ROUND));
    }
}