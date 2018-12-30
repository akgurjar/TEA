import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils";


export function validateAdminToken(req: Request, res: Response, next: NextFunction) {
    validateToken(req).then((data) => {
        next();
    }).catch((error) => {
        console.log(error);
        res.sendStatus(401);
    });
}


export async function validateToken(req: Request) {
    const header = req.header('Authorization');
    console.log(header);
    if (header) {
        const pair = header.split(' ');
        if (pair[0] === 'Bearer') {
            return verifyToken(pair[1]);
        }
    }
    return null;
}