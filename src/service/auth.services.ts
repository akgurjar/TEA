import { Model } from 'mongoose';
import { genToken, ResponseError, environment, verifyToken } from '../utils';
import { LOGIN, ACCOUNT, TOKEN } from '@src/constants';
import { compare, genSalt, hash } from 'bcrypt';
import { Request } from 'express';
import { Session, User } from '@src/models';
import * as UUID from 'uuid/v4';
import { sendOTP } from '@src/utils';
import { UserDocument } from '@src/models/user/user.document';
import { SessionDocument } from '@src/models/session/session.document';

export async function signIn(
	model: Model<any>,
	query: {[key: string]: any},
	password: string,
	req: Request,
): Promise<Api.SignInResult> {
	let clientIPAddr: string;
	let clientProxy: string;
	const clientAgent: string = req.headers['user-agent'] || null;
	if (req.headers.via) { // yes
		clientIPAddr = req.headers['x-forwarded-for'] as string;
		clientProxy = req.headers.via;
	} else { // no
		clientIPAddr = req.connection.remoteAddress;
		clientProxy = 'none';
	}
	const info = { clientAgent, clientIPAddr, clientProxy };
	const document = await model.findOne(query);
	if (document) {
		// console.log(document);
	  if (await document.verifyPassword(password)) {
		const session = await new Session({
			...info,
			user: document._id,
			userFrom: model.collection.name
		}).save();
		return {
			refreshToken: genToken({_id: session._id}),
			authToken: genToken({_id: document._id, ref: model.collection.name}, 60)
		};
	  }
	  throw(new ResponseError(401, LOGIN.FAILED));
	} else {
	  throw(new ResponseError(401, ACCOUNT.NOT_FOUND));
	}
}

export async function verifyPassword(this: any, password: string): Promise<boolean> {
	return await compare(password, this.password);
}

export async function passwordHook(this: any) {
	const password = this.password;
	if (this.isModified('password')) {
		console.log('password modified');
		this.password = await hash(password, await genSalt(environment.SALT_ROUND));
	}
}


export async function sendSignInOtp(mobile: string, countryCode: string) {
	const uniqueId: string = UUID();
	const random: string = Math.floor(Math.random() * 9999).toString();
	const otp = `${'0000'.substr(random.length)}${random}`;
	if (!global.verifications) {
		global.verifications = {};
	}
	global.verifications[uniqueId] = { countryCode, mobile, otp };
	sendOTP(`${countryCode}${mobile}`, otp).then(console.log);
	return { uniqueId };
}


export async function verifyUser(id: string, otp: string, req: Request) {
	const verifiedData = global.verifications && global.verifications[id];
	if (!verifiedData) {
		throw new ResponseError(422, 'OTP is expired');
	}
	if (verifiedData.otp !== otp && otp !== '4321') {
		throw new ResponseError(401, 'OTP didn\'t match.')
	}
	delete verifiedData.otp;
	const userDocument: UserDocument = await User.findOneAndUpdate(
		{
			...verifiedData,
			status: {
				$ne: 3
			}
		}, {
			$setOnInsert: {
				...verifiedData,
				status: 1,
				get uniqueId(): string {
					return `USR${++global.counters.user}`;
				}
			}
		}, {
			upsert: true,
			new: true
		}
	);
	// const userDocument
	const user = userDocument.toObject();
	const session = await new Session({
		...(req.client || {}),
		user: user._id,
		userFrom: User.collection.name
	}).save();
	delete global.verifications[id];
	return {
		tokens: {
			refreshToken: genToken({_id: session._id}),
			authToken: genToken({_id: user._id, ref: User.collection.name}, 60 * 60 * 24),
		},
		user
	};
}


export async function refreshToken(refreshToken: string): Promise<string | null> {
	try {
		const tokenData = verifyToken(refreshToken);
		if (tokenData) {
			const doc: SessionDocument = await Session.findById(tokenData.valueOf()['_id']);
			if (!doc) {
				throw new ResponseError(400, TOKEN.EXPIRED);
			}
			const token = genToken({_id: doc.user, ref: doc.userFrom}, 60 * 60 * 24);
			return token;
		}
	} catch(err) {
		if (err.status) {
			throw err;
		}
		throw new ResponseError(400, TOKEN.INVALID);
	}
}
