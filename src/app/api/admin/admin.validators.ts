import Joi from 'joi';
import { JEmail, JPassword } from '#api/api.validators';
import { validate } from '#middlewares/validator.middleware';

export const adminValidators = {
	forgot: validate(
		Joi.object().keys({
			email: JEmail.required(),
		}),
		'body',
	),
	login: validate(
		Joi.object().keys({
			email: JEmail.required(),
			password: JPassword.required(),
		}),
		'body',
	),
	reset: validate(
		Joi.object().keys({
			password: JPassword.required(),
		}),
		'body',
	),
};
