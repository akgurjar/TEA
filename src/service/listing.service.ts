import { Model } from 'mongoose';
// import { Console } from '../utils';

export async function paginate(
	model: Model<any>,
	match: any,
	{pageIndex, pageSize}: App.Pagination,
): Promise<Api.ListingResult> {
	const result: any[] = await model.aggregate([
		{ $match: match },
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
					$slice: [
						'$data',
						pageIndex * pageSize,
						pageSize,
					],
				},
				total: 1,
			},
		},
	]);
	// Console.info(result);
	if (result.length === 0) {
		result.push({
			data: [],
			total: 0,
		});
	}
	return {
		pageIndex,
		pageSize,
		...result[0],
	};
}

export async function list(
	model: Model<any>,
	{pageIndex, pageSize, ...options}: App.Listing,
): Promise<Api.ListingResult> {
	const query: any = {};
	if (options.searchText) {
		query.displayName = {
			$regex: new RegExp(options.searchText, 'gi'),
		};
	}
	return await paginate(model, query, {pageIndex, pageSize});
}
