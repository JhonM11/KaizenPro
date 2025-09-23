import Joi from "joi";

export const createTypeObjectiveSchema = Joi.object({
  code: Joi.number().integer().required(),
  name: Joi.string().max(70).required(),
});
