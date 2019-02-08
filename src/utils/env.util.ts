import { config } from "dotenv";
import { existsSync } from "fs";
import { join } from "path";

export const ENVIRONMENT = process.env.NODE_ENV;


switch (ENVIRONMENT) {
    case "production": {
        envConfig("production.env");
        break;
    }
    case "development": {
        envConfig("development.env");
        break;
    }
    case "staging": {
        envConfig("staging.env");
        break;
    }
    default: {
        envConfig("local.env");
        break;
    }
}

function envConfig(configPath: string) {
    const envPath = join(__dirname, "../../environments", configPath);
    if (existsSync(envPath)) {
        config({ path: envPath });
    } else {
        // global.logger.error("Environment file not found");
        console.log("Environment file not found!");
        process.exit(1);
    }
}

export const environment = {
    get MONGODB_URI(): string { return process.env["MONGODB_URI"] },
    get PORT(): number { return process.env["PORT"] as any },
    get TOKEN_SECRET(): string { return process.env["TOKEN_SECRET"] },
    get SALT_ROUND(): number { return process.env["SALT_ROUND"] as any },
    get ENC() { return process.env["ENC"] }
};
