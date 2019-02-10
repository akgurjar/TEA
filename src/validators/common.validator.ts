import * as Joi from "joi";
import { JString } from "./schemas";
import { validateSchema } from "../middlewares/validator";

export const Validators = {
	list: validateSchema(Joi.object().keys({
		pageIndex: Joi.number().default(0),
		pageSize: Joi.number().default(10),
		searchText: JString.default(""),
	}), "query"),
};
