import type { Schema, ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '#utils/index';

type DataResolver = 'params' | 'query' | 'body' | ((req: Request) => any);

function createError(err: ValidationError) {
	return ApiError.badReq(err.details[0].message.split("'").join(''), err.name);
}

export function validate(schema: Schema, dataResolver: DataResolver) {
	const isFunc = typeof dataResolver === 'function';
	return (req: Request, _: Response, next: NextFunction) => {
		const data = isFunc ? dataResolver(req) : req[dataResolver];
		const result = schema.validate(data);
		if (result.error) {
			return next(createError(result.error));
		} else if (result.warning) {
			return next(createError(result.warning));
		}
		req.data = result.value;
		next();
	};
}
