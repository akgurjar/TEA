import { Request, Response, NextFunction } from 'express';
// import { ResponseError } from '@src/utils';
// import { TOKEN } from '@src/constants';

/**
 * @description A controller to control admin requests
 */
class UserController {
	/**
	 * @description A function to handle user list request
	 * @param req Express request
	 * @param res Express response
	 */
	list(req: Request, res: Response, next: NextFunction) {
		//
	}
	/**
	 * @description A function to handle user profile request
	 * @param req Express request
	 * @param res Express response
	 */
	profile(req: Request, res: Response, next: NextFunction) {
		//
	}
	/**
	 * @description A function to handle admin detail requests
	 * @param req Express request
	 * @param res Express response
	 */
	detail(req: Request, res: Response) {
		//
	}
	/**
	 * @description A function to handle admin update requests
	 * @param req Express request
	 * @param res Express response
	 */
	update(req: Request, res: Response) {
		//
	}
}

export const userController = new UserController();
