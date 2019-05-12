import { NextFunction, Response, Request } from "express";


export function extractClientDetails(req: Request, res: Response, next: NextFunction) {
    let clientIPAddr: string;
	let clientProxy: string;
	const clientAgent: string = req.headers['user-agent'] || null;
	if (req.headers.via) { // yes
		clientIPAddr = req.headers['x-forwarded-for'] as string;
		clientProxy = req.headers.via;
	} else { // no
		clientIPAddr = req.connection.remoteAddress;
		clientProxy = 'none';
	}
    req.client = { clientAgent, clientIPAddr, clientProxy };
    next();
}
