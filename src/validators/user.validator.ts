import * as Joi from 'joi';
import { JString, JEmail, JPassword, JList } from './schemas';
import { validateSchema } from '../middlewares/validator';

export const Validators = {
	/**
	 * @name create
	 * @description It validate the request body with the schema.
	 * @requires displayName, dob, email, password
	 */
	create: validateSchema(Joi.object().keys({
		displayName: JString.required(),
		dob: JString.isoDate(),
		email: JEmail.required(),
		password: JPassword.required(),
	}), 'body'),
	/**
	 * @name forgot
	 * @description It validate the request body with the schema.
	 * @requires email
	 */
	forgot: validateSchema(Joi.object().keys({
		email: JEmail.required(),
	}), 'body'),
	/**
	 * @name list
	 * @description It validate the request paramters with the schema.
	 * @requires pageIndex, pageSize
	 */
	list: validateSchema(JList.keys({
		createdFrom: Joi.date(),
		createdTo: Joi.when('createdFrom', {
			is: Joi.exist(),
			then: Joi.date().greater(Joi.ref('createdFrom')),
		}),
		status: Joi.number().allow(0, 1, 2, 3, 4),
	}), 'query'),
	/**
	 * @name login
	 * @description It validate the request body with the schema.
	 * @requires email,password
	 */
	login: validateSchema(Joi.object().keys({
		email: JEmail.required(),
		password: JPassword.required(),
	}), 'body'),
	/**
	 * @name reset
	 * @description It validate the request body with the schema.
	 * @requires password
	 */
	reset: validateSchema(Joi.object().keys({
		password: JPassword.required(),
	}), 'body'),
};
