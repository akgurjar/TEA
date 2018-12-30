import Admin from '../models/admin.model';


export const admin = {
    authenticate(email: string, password: string) {
        return Admin.token(Admin, {email}, password);
    }
};