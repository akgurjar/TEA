
import { Typegoose, staticMethod, ModelType } from 'typegoose';


export class Common extends Typegoose {
  @staticMethod
  static async paginate(model: ModelType<Common> & typeof Common, query: {[key: string]: any}, {pageIndex, pageSize}: App.PaginateOptions): Promise<string> {
    return await model.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1
          },
          list: {
            $push: '$$ROOT'
          }
        }
      },
      {
        $project: {
          count: 1,
          list: {
            '$slice': ['$list', pageIndex * pageSize, pageSize]
          }
        }
      }
    ]);
  }
}