
import {Admin} from '../models/admin';
import * as Service from '../service';

export async function bootstrapApp() {
    if (!await Service.exists(Admin, {})) {
        return await Service.save(Admin , {
            email: 'admin@gmail.com',
            password: 'asdfghjkl',
            name: 'Rcc Admin'
        });
    }
}