import { compare, genSalt, hash } from 'bcrypt';
import { environment } from './env.util';

export const passwordUtil = {
	async verify(this: any, password: string): Promise<boolean> {
		return await compare(password, this.password);
	},
	async hook(this: any) {
		const password = this.password;
		if (this.isModified('password')) {
			// console.log('password modified');
			this.password = await hash(password, await genSalt(environment.SALT_ROUND));
		}
	},
};
