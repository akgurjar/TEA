import { validateSchema } from '../middlewares';
import * as Joi from 'joi';
import { JString } from '@validators/index';

export const apiValidators = {
	entity: validateSchema(Joi.object({
		id: JString.length(24).required(),
	}), 'params'),
};
