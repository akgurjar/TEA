import type { Request, Response } from 'express';
import { TokenType } from '#app/app.constants';
import { ApiError } from '#utils/error.util';
import {
	verifyMailToken,
	verifyAccessToken,
	verifyRefreshToken,
} from '#utils/jwt.util';

export function auth(tokenType: TokenType) {
	if (!TokenType[tokenType]) {
		throw new Error('Wrong token type is configured');
	}
	return async (req: Request, _: Response): Promise<void> => {
		const auth = req.headers.authorization;
		if (!auth) {
			throw ApiError.unauthorised('AUTH.MISSING');
		}
		const [scheme, token] = auth.split(' ');
		if (scheme !== 'Bearer') {
			throw ApiError.unauthorised('AUTH.INVALID_SCHEME');
		}
		if (!token) {
			throw ApiError.unauthorised('AUTH.NO_TOKEN');
		}
		try {
			switch (tokenType) {
				case TokenType.ACCESS: {
					const decoded = verifyAccessToken(token);
					break;
				}
				case TokenType.REFRESH: {
					const decoded = verifyRefreshToken(token);
					break;
				}
				case TokenType.MAIL: {
					const decoded = verifyMailToken(token);
					break;
				}
			}
		} catch (err) {
			if (err instanceof ApiError) {
				throw err;
			} else if (err instanceof Error) {
				throw ApiError.unauthorised(err.message);
			}
			throw ApiError.unauthorised('AUTH.INTERNAL_ERROR');
		}
	};
}
