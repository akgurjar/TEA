import * as Joi from 'joi';


export const Email = Joi.string().trim().lowercase().email();
export const Password = Joi.string().trim().min(6).max(24);