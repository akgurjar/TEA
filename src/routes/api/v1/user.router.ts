import { Router } from "express";
import { userController } from "../../../controllers";
import * as Validators from "../../../validators";
import { authenticate } from "passport";

const router: Router = Router();

// secured router
const secureRouter: Router = Router();

secureRouter.head("/token", userController.validateToken);
secureRouter.get("/details", userController.fetchProfile);

router.post("/authenticate", Validators.User.login, userController.login);

router.post("/create", Validators.User.create, userController.create);

router.use("/", authenticate("user-token", { session: false }), secureRouter);

export default router;
