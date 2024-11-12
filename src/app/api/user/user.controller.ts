import type { Request, Response } from 'express';
import { userService } from './user.service.js';
import { ApiError } from '#utils/error.util';
// import { ResponseError } from '@src/utils';
// import { TOKEN } from '@src/constants';

class UserController {
	async list(req: Request, res: Response) {
		const result = await userService.list(req.query);
		res.success('Success', result);
	}
	async register(req: Request, res: Response) {
		const data = req.data as IUser.Data;
		const result = await userService.add(data);
		res.success('Success', result);
	}
	async profile(req: Request, res: Response) {
		const user = req.user;
		if (!user) {
			throw ApiError.unauthorised('User not found');
		}
		const result = await userService.detail(user.id);
		res.success('Success', result);
	}
	async detail(req: Request, res: Response) {
		const data = req.data as { user: string };
		const result = await userService.detail(data.user);
		res.success('Success', result);
	}
	async update(req: Request, res: Response) {
		//
	}
}

export const userController = new UserController();
