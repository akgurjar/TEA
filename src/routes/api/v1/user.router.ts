import { Router } from 'express';
import { userController } from '../../../controllers';
import * as Validators from '../../../validators';
import { authenticate } from 'passport';

const router: Router = Router();

// secured router
const secureRouter: Router = Router();

// Get Users List
secureRouter.get('/', Validators.User.list, userController.list);

// Get logined user profile
secureRouter.get('/profile', userController.fetchProfile);

// Entity Router
const entityRouter = Router();

entityRouter.route('/')
.get(userController.fetchDetails)
.post(userController.fetchDetails);

// Access user with id
secureRouter.use('/:id', Validators.Common.entity, entityRouter);

// authenticate user
router.post('/authenticate', Validators.User.login, userController.login);

router.post('/create', Validators.User.create, userController.create);

router.use('/', authenticate('token', { session: false }), secureRouter);

export default router;
