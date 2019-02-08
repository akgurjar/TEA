import { Model } from "mongoose";

export async function paginate(model: Model<any>, match: any): Promise<Api.ListingResult> {
	const result: any = await model.aggregate([
		{ $match: match },
		{
			$group: {
				_id: null,
				data: {
					$push: "$$ROOT",
				},
				total: {
					$sum: 1,
				},
			},
		},
		{
			$project: {
				_id: 0,
			},
		},
	]);
	return result;
}
