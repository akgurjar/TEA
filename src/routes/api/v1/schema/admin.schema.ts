
import * as Joi from 'joi';


export const AdminSchema = {
    get login() {
        return Joi.object().keys({
            username: Joi.string().email().required(),
            password: Joi.string().required()
        });
    }
};
