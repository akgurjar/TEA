import Joi from 'joi';
import { validate } from '#app/middlewares/validator.middleware';
import { JEmail, JPassword, JList } from '#api/api.validators';

export const userValidators = {
	forgot: validate(
		Joi.object().keys({
			email: JEmail.required(),
		}),
		'body',
	),
	/**
	 * @name list
	 * @description It validate the request paramters with the schema.
	 * @requires pageIndex, pageSize
	 */
	list: validate(
		JList.keys({
			createdFrom: Joi.date(),
			createdTo: Joi.when('createdFrom', {
				is: Joi.exist(),
				then: Joi.date().greater(Joi.ref('createdFrom')),
			}),
			status: Joi.number().allow(0, 1, 2, 3, 4),
		}),
		'query',
	),
	/**
	 * @name login
	 * @description It validate the request body with the schema.
	 * @requires email,password
	 */
	login: validate(
		Joi.object().keys({
			email: JEmail.required(),
			password: JPassword.required(),
		}),
		'body',
	),
	/**
	 * @name reset
	 * @description It validate the request body with the schema.
	 * @requires password
	 */
	reset: validate(
		Joi.object().keys({
			password: JPassword.required(),
		}),
		'body',
	),
};
