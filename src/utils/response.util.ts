import { type Response } from 'express';
import { ApiError } from './error.util.js';

export class Respond {
	static error(res: Response, { status, message, error }: ApiError) {
		res.status(status || 500).json({ message, error });
	}
	static success(res: Response, message: string, result: any = null) {
		res.json({ message, result });
	}
	constructor(private res: Response) {
		//
	}
	error({ status, message, error }: ApiError) {
		this.res.status(status || 500).json({ message, error });
	}
	success(message: string, result: any = null) {
		this.res.json({ message, result });
	}
}
