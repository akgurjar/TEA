
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
        const lastUser = await User.findOne({}).sort({uniqueId: -1}).select({uniqueId: 1, _id: 0}).exec();
        let userCounter = 0;
        if (lastUser) {
            const userId = lastUser.uniqueId || 'USR0';
            userCounter = parseInt(userId.substr(3));
        }
        global.counters = {
            user: userCounter
        };
    }
};