import * as Joi from 'joi';
import { Email, Password } from './schemas';
import { validateSchema } from '../middlewares/validator';


export const Validators = {
    get login() {
        const schema = Joi.object().keys({
            email: Email.required(),
            password: Password.required()
        });
        return validateSchema(schema, 'body');
    },
    get forgot() {
        const schema = Joi.object().keys({
            email: Email.required()
        });
        return validateSchema(schema, 'body');
    },
    get reset() {
        const schema = Joi.object().keys({
            password: Password.required()
        });
        return validateSchema(schema, 'body');
    }
};