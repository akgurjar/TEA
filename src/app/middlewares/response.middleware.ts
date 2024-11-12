import { Request, Response, NextFunction } from 'express';
import { ApiError } from '#utils/error.util';

export function responseMiddleware(
	_: Request,
	res: Response,
	next: NextFunction,
) {
	res.success = function (message: string, result: any = null) {
		this.json({ message, result });
	};
	next();
}
