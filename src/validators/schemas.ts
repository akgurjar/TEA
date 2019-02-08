import * as Joi from "joi";

export const JString = Joi.string().trim();
export const JEmail = JString.lowercase().email();
export const JPassword = JString.min(6).max(24).alphanum();
