import { Model, Types, Document } from "mongoose";

export async function exists(model: Model<Document>, query: any): Promise<boolean> {
	return !!await model.countDocuments(query);
}

export async function existsId(model: Model<Document>, id: string): Promise<boolean> {
	return !!await model.countDocuments({
		_id: new Types.ObjectId(id),
	});
}

export async function save(model: Model<Document>, data: any): Promise<boolean> {
	const doc = new model(data);
	return !!await doc.save();
}
