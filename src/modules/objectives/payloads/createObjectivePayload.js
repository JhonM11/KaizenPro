// src/modules/objectives/payloads/createObjectivePayload.js
import Joi from "joi";
import { BadRequestError } from "../../../utils/customErrors.js";

const schema = Joi.object({
  code_improvement: Joi.number().integer().required().messages({
    "any.required": "El código del plan de mejora es obligatorio.",
  }),
  code_type: Joi.number().integer().required().messages({
    "any.required": "El código del tipo de objetivo es obligatorio.",
  }),
  body: Joi.string().max(1000).required().messages({
    "string.empty": "El cuerpo del objetivo no puede estar vacío.",
  }),
});

export const validateCreateObjectivePayload = (payload) => {
  const { error, value } = schema.validate(payload);
  if (error) throw new BadRequestError(error.details[0].message);
  return value;
};
