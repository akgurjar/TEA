import { NextFunction } from 'express';
import { Api } from '@api/api.interface';
import { userService } from './user.service';
import { IUser } from './user.interface';
// import { ResponseError } from '@src/utils';
// import { TOKEN } from '@src/constants';

/**
 * @description A controller to control user requests
 */
class UserController {
	/**
	 * @description A function to handle user list request
	 * @param req Express request
	 * @param res Express response
	 */
	list(req: Api.Request, res: Api.Response, next: NextFunction) {
		userService.list().then((result) => {
			res.success('Successfull', result);
		}).catch((err) => {
			res.error(err);
		});
	}
	/**
	 * @description A function to handle user register request
	 * @param req Api request
	 * @param res Api response
	 */
	register(req: Api.Request<IUser>, res: Api.Response, next: NextFunction) {
		const data = req.data;
		userService.add(data).then((result) => {
			res.success('Successfull', result);
		}).catch((err) => {
			res.error(err);
		});
	}
	/**
	 * @description A function to handle user profile request
	 * @param req Express request
	 * @param res Express response
	 */
	profile(req: Api.Request, res: Api.Response, next: NextFunction) {
		const user = req.user;
		userService.detail(user?._id).then((result) => {
			res.success('Successfull', result);
		}).catch((err) => {
			res.error(err);
		});
	}
	/**
	 * @description A function to handle user detail requests
	 * @param req Express request
	 * @param res Express response
	 */
	detail(req: Api.Request, res: Api.Response) {
		const { id } = req.data || {};
		userService.detail(id).then((result) => {
			res.success('Successfull', result);
		}).catch((err) => {
			res.error(err);
		});
	}
	/**
	 * @description A function to handle user update requests
	 * @param req Express request
	 * @param res Express response
	 */
	update(req: Api.Request, res: Api.Response) {
		//
	}
}

export const userController = new UserController();
