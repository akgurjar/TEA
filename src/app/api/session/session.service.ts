import { SessionModel } from './session.model.js';
import { genAccessToken, genRefreshToken } from '#utils/jwt.util';

class SessionService {
	async create(
		user: Express.User,
		client: Express.Client,
	): Promise<ISession.Created> {
		const session = await new SessionModel({ client, user }).save();
		const data = {
			sid: session._id.toHexString(),
			sub: user.id,
			aud: process.env.URI,
		};
		return {
			access_token: genAccessToken(data),
			refresh_token: genRefreshToken(data),
		};
	}
}

export const sessionService = new SessionService();
