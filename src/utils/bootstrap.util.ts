
import Admin from '../models/admin.model';


export async function bootstrapApp() {
    if (!await Admin.countDocuments().exec()) {
        const admin = new Admin({
            email: 'admin@gmail.com',
            password: 'asdfghjkl',
            name: 'Rcc Admin'
        });
        const result = await admin.save();
        return result;
    }
}