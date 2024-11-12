export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly NODE_ENV: string;
			readonly PORT: string;
			readonly URI: string;
			readonly REDIS_URI: string;
			readonly MONGODB_URI: string;
			readonly BASIC_AUTH: string;
			readonly SALT_ROUND: string;
			readonly MAIL_TOKEN_SECRET: string;
			readonly ACCESS_TOKEN_SECRET: string;
			readonly REFRESH_TOKEN_SECRET: string;
			readonly SENDER_EMAIL: string;
			readonly SENDER_PASSWORD: string;
			readonly SUPER_ADMIN_NAME: string;
			readonly SUPER_ADMIN_EMAIL: string;
			readonly SUPER_ADMIN_PASSWORD: string;
		}
	}
	interface Db {
		connect(): Promise<void>;
		disconnect(): Promise<void>;
	}
	namespace Token {
		interface Base {
			/**
			 * Auth Domain URL
			 * @example auth.domain.com
			 */
			iss: string;
			/**
			 * Audience URL
			 * @example app.domain.com
			 */
			aud: string;
			/** Token Id */
			jti: string;
			/** User ID */
			sub: string;
		}
		interface Decoded {
			iat: number;
			exp: number;
		}
		interface Access extends Base {
			/** Session Id */
			sid: string;
			/** Profile Fields */
			// scope: string;
		}
		type AccessDecoded = Access & Decoded;
		interface Refresh extends Base {
			/** Session Id */
			sid: string;
		}
		type RefreshDecoded = Refresh & Decoded;
		interface Mail extends Base {
			/** Email Id */
			email: string;
		}
		type MailDecoded = Mail & Decoded;
	}
}
