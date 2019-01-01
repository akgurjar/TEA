import Admin from '../models/admin.model';
import { Types } from 'mongoose';


export const admin = {
    token(email: string, password: string): Promise<string> {
        return Admin.token(Admin, {email}, password);
    },
    async adminPresent(id: string) {
        return !Admin.countDocuments({_id: new Types.ObjectId(id)}).exec();
    },
    async details(id: string) {
        return await Admin.findById(id, {name: 1, email: 1, photo: 1});
    }
};