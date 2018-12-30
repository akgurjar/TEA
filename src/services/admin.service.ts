import Admin from '../models/admin.model';
import { Types } from 'mongoose';


export const admin = {
    authenticate(email: string, password: string) {
        return Admin.token(Admin, {email}, password);
    },
    async adminPresent(id: string) {
        return !Admin.countDocuments({_id: new Types.ObjectId(id)}).exec();
    }
};