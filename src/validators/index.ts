import * as Joi from 'joi';

export const JNumber = Joi.number();
export const JString = Joi.string().trim();
export const JEmail = JString.lowercase().email();
export const JMobile = JString.length(10).regex(/[0-9]{10}/);
export const JPassword = JString.min(6).max(24).alphanum();
export const JList = Joi.object().keys({
	pageIndex: JNumber.default(0),
	pageSize: JNumber.default(10),
	searchText: JString,
	sort_by: JString,
	sort_order: Joi.when('sort_by', {
		is: Joi.exist(),
		then: JString.allow('asc', 'desc').default('asc'),
	}),
});
