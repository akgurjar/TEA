import { config } from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';
// import { Environment } from 'node';

export const ENVIRONMENT = process.env.NODE_ENV;

switch (ENVIRONMENT) {
	case 'production': {
		envConfig('.env.production');
		break;
	}
	case 'development': {
		envConfig('.env.development');
		break;
	}
	case 'staging': {
		envConfig('.env.staging');
		break;
	}
	default: {
		envConfig('.env.local');
		break;
	}
}

function envConfig(configPath: string) {
	const envPath = join(process.cwd(), 'environments', configPath);
	if (existsSync(envPath)) {
		config({ path: envPath });
	} else {
		// global.logger.error('Environment file not found');
		// console.log('Environment file not found!');
		process.exit(1);
	}
}

export const environment: any = process.env;
