export class ApiError extends Error {
	static unauthorised(message: string, error?: string): ApiError {
		return new ApiError(message, 401, error);
	}
	static forbidden(message: string, error?: string): ApiError {
		return new ApiError(message, 403, error);
	}
	static badReq(message: string, error?: string): ApiError {
		return new ApiError(message, 400, error);
	}
	static notFound(message: string, error?: string): ApiError {
		return new ApiError(message, 404, error);
	}
	static internal(message: string, error?: string): ApiError {
		return new ApiError(message, 500, error);
	}
	static unprocessable(message: string, error?: string): ApiError {
		return new ApiError(message, 422, error);
	}
	/** The user has sent too many requests in a given amount of time */
	static tooManyReq(message: string, error?: string): ApiError {
		return new ApiError(message, 429, error);
	}
	/** This response is sent when a request conflicts with the current state of the server */
	static conflict(message: string, error?: string): ApiError {
		return new ApiError(message, 409, error);
	}
	/** This response is sent when the requested content has been permanently deleted from server, with no forwarding address */
	static gone(message: string, error?: string): ApiError {
		return new ApiError(message, 410, error);
	}
	name = 'ApiError';
	constructor(
		message: string,
		public status: number,
		public error?: string,
	) {
		super(message);
	}
}
