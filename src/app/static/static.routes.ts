import { Router } from 'express';
import { Assets } from './static.model';

// create Router
const router: Router = Router();

// Create Admin Assets attach it with router
new Assets('admin').attach(router);

// Create Admin Assets attach it with router
new Assets('templates').attach(router);

// Create Admin Assets attach it with router
new Assets('client').attach(router, '');

export default router;
