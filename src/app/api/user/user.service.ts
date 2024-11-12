import { mongoDAO } from '#database/mongo/mongo.dao';
import { type PipelineStage } from 'mongoose';
import { UserModel } from './user.model.js';

class UserService {
	async list(query: object): Promise<IApi.ListingResult> {
		console.log(query);
		const pipeline: PipelineStage[] = [];
		// add pagination
		mongoDAO.paginate(pipeline, 0, 10);
		// post pagination stages
		const result = await UserModel.aggregate(pipeline).exec();
		return result[0];
	}
	async add(data: IUser.Data): Promise<IUser.Doc> {
		const doc = await UserModel.create(data);
		return doc as IUser.Doc;
	}
	async detail(id: string): Promise<IUser.Doc | null> {
		const doc = await UserModel.findById(id).exec();
		return doc as IUser.Doc;
	}
}

export const userService = new UserService();
