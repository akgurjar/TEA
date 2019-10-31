
import { Admin, User } from '@src/models';
import * as Service from '@src/service';
import { Console } from './logger.util';
import { environment } from './env.util';

export const Bootstrap: App.Bootstrap = {
	async init(this: App.Bootstrap) {
		Console.info('Bootstrapping App');
		await Promise.all([
			this.bootstrapAdmin(),
			this.bootstrapCounters(),
		]);
	},
	async bootstrapAdmin() {
		if (!await Service.exists(Admin, {})) {
			await Service.save(Admin , {
				displayName: environment.SUPER_ADMIN_NAME,
				email: environment.SUPER_ADMIN_EMAIL,
				password: environment.SUPER_ADMIN_PASSWORD,
			});
			Console.info('Admin Account Created');
		} else {
			Console.info('Admin Already Present');
		}
	},
	async bootstrapCounters() {
		const lastUser = await User.findOne({}).sort({uniqueId: -1}).select({uniqueId: 1, _id: 0}).exec();
		let userCounter = 0;
		if (lastUser) {
			const userId = lastUser.uniqueId || 'USR0';
			userCounter = parseInt(userId.substr(3), 10);
		}
		global.counters = {
			user: userCounter,
		};
	},
};
