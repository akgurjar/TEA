import * as Joi from 'joi';

export const JString = Joi.string().trim();
export const JEmail = JString.lowercase().email();
export const JPassword = JString.min(6).max(24).alphanum();
export const JList = Joi.object().keys({
	pageIndex: Joi.number().default(0),
	pageSize: Joi.number().default(10),
	searchText: JString,
	sort_by: Joi.string(),
	sort_order: Joi.when('sort_by', {
		is: Joi.exist(),
		then: Joi.string().allow('asc', 'desc').default('asc')
	}),
});