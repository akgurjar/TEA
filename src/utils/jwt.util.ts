import * as jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

function genToken(
	payload: Record<string, string>,
	secret: string,
	expiresIn?: number,
) {
	const options: jwt.SignOptions = {
		algorithm: 'HS256',
	};
	if (expiresIn) {
		options.expiresIn = expiresIn;
	}
	return jwt.sign(
		{ iss: process.env.URI, jti: randomUUID(), ...payload },
		secret,
		options,
	);
}

export function genAccessToken(
	payload: Omit<Token.Access, 'iss' | 'jti'>,
	expiresIn: number = 2 * 60, // 2 minutes
): string {
	return genToken(payload, process.env.ACCESS_TOKEN_SECRET, expiresIn);
}

export function genRefreshToken(
	payload: Omit<Token.Refresh, 'iss' | 'jti'>,
	expiresIn: number = 30 * 24 * 60 * 60, // 1 month
): string {
	return genToken(payload, process.env.REFRESH_TOKEN_SECRET, expiresIn);
}

export function genMailToken(
	payload: Omit<Token.Mail, 'iss' | 'jti'>,
	expiresIn?: number,
): string {
	return genToken(payload, process.env.MAIL_TOKEN_SECRET, expiresIn);
}

export function verifyAccessToken(token: string): Token.AccessDecoded {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
		algorithms: ['HS256'],
	}) as Token.AccessDecoded;
}

export function verifyRefreshToken(token: string): Token.RefreshDecoded {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
		algorithms: ['HS256'],
	}) as Token.RefreshDecoded;
}

export function verifyMailToken(token: string): Token.MailDecoded {
	return jwt.verify(token, process.env.MAIL_TOKEN_SECRET, {
		algorithms: ['HS256'],
	}) as Token.MailDecoded;
}
