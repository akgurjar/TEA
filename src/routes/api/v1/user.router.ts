import { Router } from "express";
import { userController } from "../../../controllers";
import * as Validators from "../../../validators";
import { authenticate } from "passport";

const router: Router = Router();

// secured router
const secureRouter: Router = Router();

secureRouter.get("/", Validators.Common.list, userController.list);

secureRouter.get("/details", userController.fetchProfile);

router.post("/authenticate", Validators.User.login, userController.login);

router.post("/create", Validators.User.create, userController.create);

router.use("/", authenticate("token", { session: false }), secureRouter);

export default router;
