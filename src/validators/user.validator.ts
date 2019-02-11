import * as Joi from "joi";
import { JString, JEmail, JPassword, JList } from "./schemas";
import { validateSchema } from "../middlewares/validator";

export const Validators = {
	create: validateSchema(Joi.object().keys({
		displayName: JString.required(),
		dob: JString.isoDate(),
		email: JEmail.required(),
		password: JPassword.required(),
	}), "body"),
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
	// 
	list: validateSchema(JList.keys({
		createdFrom: Joi.date(),
		createdTo: Joi.date().optional().greater(Joi.ref('createdFrom'))
	}), 'query'),
};
