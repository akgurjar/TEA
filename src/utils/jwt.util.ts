import { sign, verify, SignOptions } from 'jsonwebtoken';
import { environment } from './env.util';

export function genToken(payload: {[key: string]: any}, expiresIn?: number) {
	const options: SignOptions = {};
	if (expiresIn) {
		options.expiresIn = expiresIn;
	}
	return sign(payload, environment.AUTH_TOKEN_SECRET, options);
}

export function genMailToken(payload: {[key: string]: any}) {
	return sign(payload, environment.MAIL_TOKEN_SECRET);
}

export function verifyToken<T>(token: string): string | T {
	return verify(token, environment.AUTH_TOKEN_SECRET) as string | T;
}

export function verifyMailToken<T>(token: string): string | T {
	return verify(token, environment.MAIL_TOKEN_SECRET) as string | T;
}
