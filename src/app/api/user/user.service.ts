import { Api } from '@api/api.interface';
import { DAO } from '@src/database';
import { UserModel } from './user.model';
import { IUserDocument, IUser } from './user.interface';

class UserService {
	async list(): Promise<Api.ListingResult> {
		const pipeline: object[] = [];
		// add pagination
		DAO.paginate(pipeline, 0, 10);
		// post pagination stages
		const result = await UserModel.aggregate(pipeline).exec();
		return result[0];
	}
	async add(data: IUser): Promise<IUserDocument> {
		const doc = await DAO.save(UserModel, data);
		return doc;
	}
	async detail(id: string): Promise<IUserDocument> {
		const doc = await UserModel.findById(id).exec();
		return doc;
	}
}

export const userService = new UserService();
