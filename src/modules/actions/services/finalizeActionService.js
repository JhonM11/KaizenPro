// src/modules/actions/services/finalizeActionService.js
import { ActionRepository } from "../repositories/actionsRepository.js";
import {
  ConflictError,
  ResourceNotFoundError,
  InternalServerError,
} from "../../../utils/customErrors.js";

const finalizeActionService = async (code, userCode) => {
  try {
    const action = await ActionRepository.findByCode(code);

    if (!action) {
      throw new ResourceNotFoundError(`La acción con código ${code} no existe.`);
    }

    if (action.state === "D") {
      throw new ConflictError(`La acción con código ${code} ya está finalizada.`);
    }

    action.state = "D";
    action.final_date = new Date();
    action.code_user_completed = userCode;

    await ActionRepository.save(action);

    return action;
  } catch (error) {
    // si ya es un AppError, relanzamos
    if (error.status) throw error;

    // si es otro error, lanzamos un error interno controlado
    throw new InternalServerError("Error interno al finalizar la acción.");
  }
};

export default { finalizeActionService };
