
/**
 * @description All Custom Environment variables
 */

declare interface Environment {
    MONGODB_URI?: string;
    PORT?: number;
    AUTH_TOKEN_SECRET?: string;
    MAIL_TOKEN_SECRET?: string;
    SALT_ROUND?: number;
    ENC?: number;
    SENDER_EMAIL?: string;
    SENDER_PASSWORD?: string;
    SUPER_ADMIN_NAME?: string;
    SUPER_ADMIN_EMAIL?: string;
    SUPER_ADMIN_PASSWORD?: string;
}
