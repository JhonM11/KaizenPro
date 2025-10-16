// src/modules/actions/payloads/createActionPayload.js
export const validateCreateActionPayload = (payload) => {
  const requiredFields = ["code_improvement", "code_objective", "title", "description"];
  for (const field of requiredFields) {
    if (!payload[field]) {
      return `El campo '${field}' es obligatorio.`;
    }
  }
  return null;
};
