import { NextFunction } from 'express';
import { Api } from '@api/api.interface';
import { ResponseError } from '@utils/error.util';

export function responseMiddleware(req: Api.Request, res: Api.Response, next: NextFunction) {
	res.success = function(message: string, result: any = null) {
		this.json({message, result});
	};
	res.error = function({status, message}: ResponseError) {
		this.status(status || 500).json({ message, errorCode: 0 });
	};
	next();
}
