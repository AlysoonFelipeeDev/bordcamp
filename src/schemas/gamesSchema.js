import Joi from "joi";

export const gameSchema = Joi.object({
            name: Joi.string().empty('').required(),
            image: Joi.string().required(),
            stockTotal: Joi.number().positive().required(),
            pricePerDay: Joi.number().positive().required()
});
