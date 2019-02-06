
import { Admin, User } from '../models';
import * as Service from '../service';


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
        const user = await User.findOne({}).select({uniqueId: 1}).exec();
        console.log(user);
        // global.counters = {};
    }
};