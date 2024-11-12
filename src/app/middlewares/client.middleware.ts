import type { NextFunction, Response, Request } from 'express';

export function extractClient(req: Request, _: Response, next: NextFunction) {
	let ipAddr: string | undefined;
	let proxy: string;
	const agent: string | undefined = req.headers['user-agent'];
	if (req.headers.via) {
		// yes
		ipAddr = req.headers['x-forwarded-for'] as string;
		proxy = req.headers.via;
	} else {
		// no
		if (req.socket.remoteAddress) {
			ipAddr = req.socket.remoteAddress;
		}
		proxy = 'none';
	}
	req.client = { agent, ipAddr, proxy };
	next();
}
