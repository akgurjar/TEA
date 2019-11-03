import { Request } from 'express';
import { IClient, ISessionUser, ISessionToken } from './session.interface';
import { SessionModel } from './session.model';
import { genToken } from '@src/utils';

class SessionService {
	async create(req: Request, user: ISessionUser): Promise<ISessionToken> {
		const client: IClient = {
			agent: req.headers['user-agent'] || null,
			ipAddr: null,
			proxy: null,
		};
		if (req.headers.via) { // proxy server
			client.ipAddr = req.headers['x-forwarded-for'] as string;
			client.proxy = req.headers.via;
		} else {
			client.ipAddr = req.connection.remoteAddress;
		}
		const session = await new SessionModel({ client, user }).save();
		return {
			authToken: genToken(user, 60),
			refreshToken: genToken({ _id: session._id }),
		};
	}
}

export const sessionService = new SessionService();
