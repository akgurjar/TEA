import * as Joi from 'joi';

export const String = Joi.string().trim();
export const Email = String.lowercase().email();
export const Password = String.min(6).max(24).alphanum();