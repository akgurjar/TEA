
import { Response } from "express";
import { ResponseError } from "./error.util";

export class Respond {
	static error(res: Response, {status, message}: ResponseError) {
		res.status(status || 500).json({ message, errorCode: 0 });
	}
	static success(res: Response, message: string, result: any) {
		res.json({message, result});
	}
	constructor(private res: Response) {
		//
	}
	error({status, message}: ResponseError) {
		this.res.status(status || 500).json({ message, errorCode: 0 });
	}
	success(message: string, result: any) {
		this.res.json({message, result});
	}
}
