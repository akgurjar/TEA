declare namespace IUser {
	type Model = import('./user.model.ts').Model;
	interface Data {
		name: string;
		email: string;
		password: string;
		pictureUrl?: string;
		createdAt: Date;
		updatedAt: Date;
	}

	interface Doc extends Data, import('mongoose').Document {
		verifyPassword?(password: string): Promise<boolean>;
	}
}
