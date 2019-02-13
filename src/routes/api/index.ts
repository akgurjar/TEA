import { Router, Response, NextFunction } from 'express';
import v1 from './v1';
import { ResponseError, Respond } from '../../utils';
import { Request } from 'express-serve-static-core';

// create Router
const router: Router = Router();
// const router1: Router = Router();

router.get('/', (req, res) => res.send('Listening to api'));

router.use('/v1', v1);

router.use((_, __, next: NextFunction) => {
	next(new ResponseError(404, 'Not Found!'));
});

router.use((error: ResponseError, req: Request, res: Response, next: NextFunction) => {
	Respond.error(res, error);
});
// console.dir(router);
export default router;
