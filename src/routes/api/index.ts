import { Router } from 'express';
import v1 from './v1';

// create Router
const router: Router = Router();
// const router1: Router = Router();

router.get('/', (req, res) => res.send('Listening to api'));

router.use("/v1", v1);

// console.dir(router);
export default router;