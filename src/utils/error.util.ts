
export class ResponseError extends Error {
	name = 'ResponseError';
	constructor(public status: number, message: string, public errorCode?: number) {
		super(message);
	}
}
