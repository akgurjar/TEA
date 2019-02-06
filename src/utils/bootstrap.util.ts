
import { Admin } from '../models/admin';
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

export const Bootstrap: App.Bootstrap = {
    async init(this: App.Bootstrap) {
        await Promise.all([
            this.bootstrapAdmin(),
            this.bootstrapCounters(),
        ]);
    },
    async bootstrapAdmin() {
        if (!await Service.exists(Admin, {})) {
            await Service.save(Admin , {
                email: 'admin@gmail.com',
                password: 'asdfghjkl',
                name: 'Rcc Admin'
            });
        }
    },
    async bootstrapCounters() {
        // global.counters.user
    }
};