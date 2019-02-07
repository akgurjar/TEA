import { Router } from 'express';
import admin from './admin.router';
import user from './user.router';

const router: Router = Router();

router.use("/admin", admin);
router.use("/users", user);

export default router;