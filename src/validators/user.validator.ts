import * as Joi from "joi";
import { String, Email, Password } from "./schemas";
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
    }), "body"),
    create: validateSchema(Joi.object().keys({
        email: Email.required(),
        password: Password.required(),
        displayName: String.required(),
        dob: String.isoDate()
    }), "body")
};