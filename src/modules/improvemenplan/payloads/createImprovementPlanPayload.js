// src/modules/improvementplan/payloads/createImprovementPlanPayload.js
import Joi from "joi";
import { BadRequestError } from "../../../utils/customErrors.js";

const createImprovementPlanSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(1000).required(),
  comment: Joi.string().max(255).required(),
  // El estado se establece automáticamente en "P"
  code_timeframes: Joi.number().integer().required(),
});

export const validateCreateImprovementPlanPayload = (payload) => {
  const { error, value } = createImprovementPlanSchema.validate(payload);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  return value;
};
