import * as Joi from "joi";
import { Email, Password } from "./schemas";
import { validateSchema } from "../middlewares/validator";


export const Validators = {
    login: validateSchema(Joi.object().keys({
        email: Email.required(),
        password: Password.required()
    }), "body"),
    forgot: validateSchema(Joi.object().keys({
        email: Email.required(),
    }), "body"),
    reset: validateSchema(Joi.object().keys({
        password: Password.required()
    }), "body")
};