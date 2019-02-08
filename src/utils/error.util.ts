
export class ResponseError extends Error {
	name = "ResponseError";
	constructor(public status: number, message: string) {
		super(message);
	}
}
