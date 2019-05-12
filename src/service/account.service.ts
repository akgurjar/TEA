import { Model, Types, Document } from 'mongoose';
import { ResponseError } from '@src/utils';

export async function exists(model: Model<Document>, query: any): Promise<boolean> {
	return !!await model.countDocuments(query);
}

export async function existsId(model: Model<Document>, id: string): Promise<boolean> {
	const resp = await model.countDocuments({
		_id: new Types.ObjectId(id),
	});
	return !!resp;
}

export async function save(Document: Model<Document>, data: any): Promise<boolean> {
	const doc = new Document(data);
	try {
		const result = await doc.save();
		// console.log(result);
		return !!result;
	} catch (error) {
		if (error.code === 11000 && error.name === 'MongoError') {
			throw(new ResponseError(400, 'Document already present.', 4001));
		}
	}
}

export async function details(model: Model<Document>, id: string) {
	return await model.findById(id).select({password: 0}).exec();
}

export async function getId(model: Model<Document>, query: any): Promise<string | null> {
	const result = await model.findOne(query).select({_id: 1});
	if (result) {
		return result._id;
	}
	return null;
}

export async function genMailToken() {}
