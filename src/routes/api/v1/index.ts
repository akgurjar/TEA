import { Router } from 'express';
import admin from './admin.route';

const router: Router = Router();

router.use("/admin", admin);

export default router;