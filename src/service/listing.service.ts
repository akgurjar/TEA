import { Model } from "mongoose";




export async function paginate(model: Model<any>, match: any): Promise<Api.ListingResult> {
    const result: any = await model.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                total: {
                    $sum: 1
                },
                data: {
                    $push: '$$ROOT'
                }
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return result;
}