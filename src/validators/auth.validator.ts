import * as Joi from 'joi';
import { validateSchema } from "@src/middlewares";
import { JString } from './schemas';

export const Validators = {
	refreshToken: validateSchema(Joi.object().keys({
		refreshToken: JString.required(),
	}), 'body')
};