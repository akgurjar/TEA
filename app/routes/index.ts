import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

router.get("/", function(req: Request, res: Response, next: NextFunction){
	res.send("Hello from app");
});


import users from './users';
router.use("/users", users);

export default router;