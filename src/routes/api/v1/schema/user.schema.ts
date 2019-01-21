import * as Joi from 'joi';


export const UserSchema = {
    get document() {
        return Joi.object().keys({
            photo: Joi.string().uri(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            dob: Joi.string().isoDate().required()
        });
    },
    get list() {
        return Joi.object().keys({
            pageIndex: Joi.number().greater(-1).default(0),
            pageSize: Joi.number().greater(-1).default(10),
            searchText: Joi.string().trim().disallow(''),
            sortKey: Joi.string().trim().allow('createdOn', 'updatedOn', 'dob'),
            sortValue: Joi.number().allow(-1, 1)
        });
    }
};