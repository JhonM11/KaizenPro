// src/modules/timeframes/payloads/createTimeframePayload.js
import Joi from "joi";
import { BadRequestError } from "../../../utils/customErrors.js";

const createTimeframeSchema = Joi.object({
  name: Joi.string().max(50).required(),
  start_date: Joi.date().required(),
  final_date: Joi.date().greater(Joi.ref("start_date")).required(),
});

export const validateCreateTimeframePayload = (payload) => {
  const { error, value } = createTimeframeSchema.validate(payload);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  return value;
};
