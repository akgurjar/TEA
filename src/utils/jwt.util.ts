import { sign, verify } from "jsonwebtoken";
import { environment } from "./env.util";


export function genToken(payload: {[key: string]: any}) {
    return sign(payload, environment.TOKEN_SECRET);
}

export function verifyToken<T>(token: string): string | T {
    return verify(token, environment.TOKEN_SECRET) as string | T;
}

