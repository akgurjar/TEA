import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';


const router: Router = express.Router();

router.get("/", function(req: Request, res: Response, next: NextFunction){
	res.send( "users is listening..." );
});


export default router;