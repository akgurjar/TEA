import * as express from 'express';
import { join } from 'path';

export class Assets {
	constructor(public path: string) {}
	get fullPath(): string {
		return join(process.cwd(), 'assets', this.path);
	}
	attach(router: express.Router, path: string = this.path) {
		const handler: express.RequestHandler = express.static(this.fullPath);
		if (!path) {
			router.use(handler);
			return;
		}
		router.use(path, handler);
	}
}
