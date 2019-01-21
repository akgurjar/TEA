import User from '../models/user.model';
import { Types } from 'mongoose';


export const user = {
    token(email: string, password: string): Promise<string> {
        return User.token(User, {email}, password);
    },
    async userPresent(id: string) {
        return !User.countDocuments({_id: new Types.ObjectId(id)});
    },
    async details(id: string) {
        return await User.findById(id, {name: 1, email: 1, photo: 1});
    },
    async create(info: any) {
        const user = new User(info);
        const result = await user.save();
        return !!result;
    },
    async list(listing: App.Listing) {
        const query = {};
        if (listing.searchText) {
            query['$or'] = [
                {
                    name: {
                        $search: listing.searchText
                    },
                    email: {
                        $search: listing.searchText
                    }
                }
            ];
        }
        const data: any[] = await User.find(query, {password: 0}, {
            skip: listing.pageIndex * listing.pageSize,
            limit: listing.pageSize
        });
        const length: number = await User.countDocuments(query);
        return {
            pageIndex: listing.pageIndex,
            pageSize: listing.pageSize,
            length,
            data
        };
    }
};