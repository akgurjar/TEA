import { sign, verify } from 'jsonwebtoken';
import { environment } from './env.util';

export function genToken(payload: {[key: string]: any}) {
	console.log(payload, environment.AUTH_TOKEN_SECRET);
	return sign(payload, environment.AUTH_TOKEN_SECRET);
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
