import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as ejs from "ejs";
import { connect, connection } from "mongoose";
import { environment, Bootstrap } from "./utils";

import { Request, Application, Response, NextFunction } from "express";


import "./passport/initial";

import routes from "./routes";

type AppSingleton = App.Singleton<Application>;

export const app: AppSingleton = {
	instance: express(),
	async init(this: AppSingleton) {
		this.initConfig();
		await this.initDatabase();
		this.initRoutes();
	},
	/**
	 * It is used to setup view engine for templates rendering.
	 */
	initViewEngine(this: AppSingleton) {
		this.instance.set("views", path.join(__dirname, "../public"));
		this.instance.engine("html", ejs.renderFile);
		this.instance.set("view engine", "html");
	},
	/**
	 * Initialize the database connection with MongoDB
	 */
	initDatabase(): Promise<void> {
		return new Promise<void>(function(resolve, reject) {
			connection.once("open", async function() {
				console.log("Database Connected");
				await Bootstrap.init();
				resolve();
			});
			try {
				connect(environment.MONGODB_URI, {useNewUrlParser: true});
			} catch(error) {
				reject(error);
			}
		});
	},
	/**
	 * Initialize App Configurations for favicon, logger, cookie and body parser
	 */
	initConfig(this: AppSingleton) {
		this.initViewEngine();
		this.instance.use(favicon(path.join(__dirname, "../public/client", "favicon.png")));
		this.instance.use(logger("dev"));
		this.instance.use(bodyParser.json());
		this.instance.use(bodyParser.urlencoded({ extended: false }));
		this.instance.use(cookieParser());
	},
	initRoutes(this: AppSingleton) {
		this.instance.use("/admin", express.static(path.join(__dirname, "../public/admin")));
		this.instance.use(express.static(path.join(__dirname, "../public/client")));

		this.instance.use("/", routes);

		this.instance.use(function(req: Request, res: Response, next: NextFunction) {
			var err: any = new Error("Not Found");
			err.status = 404;
			next(err);
		});

		this.instance.use(function(err: any, req: Request, res: Response, next: NextFunction) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get("env") === "development" ? err : {};
		
			// render the error page
			res.status(err.status || 500);
			res.render("client/error");
		});
	}
};
