import { Request, Response } from 'express';

/**
 * @description A controller to control admin requests
 */
class AdminController {
	/**
	 * @description A function to handle admin profile requests
	 * @param req Express request
	 * @param res Express response
	 */
	profile(req: Request, res: Response) {
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

export const adminController = new AdminController();
