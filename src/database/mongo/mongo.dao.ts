import { Document, Model, Types } from 'mongoose';

/**
 * @class DaoManager
 * @description A class to access database server
 * @author Ashish Gurjar
 */
class MongoDAO {
	// constructor() { }
	/**
	 * @class DaoManager
	 * @description A function to save a document to database collection
	 * @param DocumentModel A database model
	 * @param data Document data to be saved
	 */
	async save<T extends Document>(
		DocumentModel: Model<T>,
		data: any,
	): Promise<T> {
		const document = new DocumentModel(data);
		return document.save();
	}
	/**
	 * @class DaoManager
	 * @description A function to store multiple documents to database collection
	 * @param DocumentModel A database model
	 * @param data Documents data to be saved
	 */
	async store<T extends Document>(
		DocumentModel: Model<T>,
		data: any[],
	): Promise<T[]> {
		return DocumentModel.create(data);
	}

	async find<T extends Document>(
		DocumentModel: Model<T>,
		query: object,
	): Promise<T | null> {
		return null;
	}
	async findMany<T extends Document>(
		DocumentModel: Model<T>,
		query: object,
	): Promise<T[]> {
		return [];
	}
	async findIdList<T extends Document>(
		DocumentModel: Model<T>,
		query: object,
	): Promise<string[]> {
		const result = await DocumentModel.find(query).select({ _id: 1 }).exec();
		if (!result.length) {
			return [];
		}
		return result.map(({ _id }) => _id as string);
	}
	async findId<T extends Document>(
		DocumentModel: Model<T>,
		query: object,
	): Promise<string | null> {
		const result = await DocumentModel.findOne(query).select({ _id: 1 }).exec();
		if (result) {
			return result._id as string;
		}
		return null;
	}
	async findById<T extends Document>(
		DocumentModel: Model<T>,
		id: string,
	): Promise<T[]> {
		return [];
	}
	async exists<T extends Document>(
		DocumentModel: Model<T>,
		query: object,
	): Promise<boolean> {
		return !!(await DocumentModel.countDocuments(query).exec());
	}
	async docExists<T extends Document>(
		DocumentModel: Model<T>,
		id: string,
	): Promise<boolean> {
		return this.exists<T>(DocumentModel, {
			_id: new Types.ObjectId(id),
		});
	}
	paginate(pipeline: object[], pageIndex: number, pageSize: number): void {
		pipeline.push(
			{
				$group: {
					_id: null,
					data: {
						$push: '$$ROOT',
					},
					total: {
						$sum: 1,
					},
				},
			},
			{
				$project: {
					_id: 0,
					data: {
						$slice: ['$data', pageIndex * pageSize, pageSize],
					},
					total: 1,
				},
			},
			{
				$addFields: { pageIndex, pageSize },
			},
		);
	}
	// async signin(
	// 	DocumentModel: IUser.Model | IAdmin.Model,
	// 	query: object,
	// 	password: string,
	// ): Promise<IUser.Doc | IAdmin.Doc | null> {
	// 	const doc = await DocumentModel.findOne(query).exec();
	// 	if (doc && (await doc.verifyPassword(password))) {
	// 		return doc;
	// 	}
	// 	return null;
	// }
}

export const mongoDAO = new MongoDAO();
