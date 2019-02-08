import * as Joi from "joi";
import { JEmail, JPassword } from "./schemas";
import { validateSchema } from "../middlewares/validator";

export const Validators = {
	forgot: validateSchema(Joi.object().keys({
		email: JEmail.required(),
	}), "body"),
	login: validateSchema(Joi.object().keys({
		email: JEmail.required(),
		password: JPassword.required(),
	}), "body"),
	reset: validateSchema(Joi.object().keys({
		password: JPassword.required(),
	}), "body"),
};
