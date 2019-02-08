import { Router, Request, Response, NextFunction } from "express";
import api from "./api";

const router: Router = Router();

// Api Routes
router.use("/api", api);

router.get("/admin/*", (req: Request, res: Response, next: NextFunction) => {
	res.render("admin");
});

router.get("*", (req: Request, res: Response, next: NextFunction) => {
	res.render("client");
});

export default router;
