import Joi from "joi";

export const customerSchema = Joi.object({
        name: Joi.string().empty('').required(),
        phone: Joi.string().min(10).max(10).pattern(/^\d+$/).required(),
        cpf: Joi.string().length(11).pattern(/^\d+$/).required()
});