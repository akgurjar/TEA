import { connect, disconnect } from 'mongoose';

class MongoDb implements Db {
	async connect(): Promise<void> {
		try {
			console.info('[MongoDB] Connecting ...');
			await connect(process.env.MONGODB_URI);
			console.info('[MongoDB] Connected !');
		} catch (err) {
			console.error(err);
			throw err;
		}
	}
	async disconnect(): Promise<void> {
		console.info('[MongoDB] Disconnecting ...');
		await disconnect();
		console.info('[MongoDB] Disconnected !');
	}
}

export const mongodb = new MongoDb();
