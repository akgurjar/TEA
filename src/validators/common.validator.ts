import * as Joi from "joi";
import { JString } from "./schemas";
import { validateSchema } from "../middlewares/validator";

export const Validators = {
	entity: validateSchema(Joi.object().keys({
		id: JString.length(24).required(),
	}), "query")
};
