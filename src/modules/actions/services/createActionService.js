import { ActionRepository } from "../repositories/actionsRepository.js";
import ObjectiveRepository from "../../objectives/repositories/objectiveRepository.js";
import ImprovementPlanRepository from "../../improvemenplan/repositories/improvemenplanRepository.js";
import {
  ResourceNotFoundError,
  DependencyError,
  InternalServerError,
} from "../../../utils/customErrors.js";

const createActionService = async (payload, userCode) => {
  try {
    const { code_improvement, code_objective, title, description } = payload;

    // 🔍 1. Validar existencia del plan de mejora
    const improvement = await ImprovementPlanRepository.findByCode(code_improvement);
    if (!improvement) {
      throw new DependencyError(`No existe un plan de mejora con code ${code_improvement}`);
    }

    // 🔍 2. Validar existencia del objetivo
    const objective = await ObjectiveRepository.findByCode(code_objective);
    if (!objective) {
      throw new ResourceNotFoundError(`El objetivo con code ${code_objective} no existe`);
    }

    // 🔢 3. Obtener siguiente código secuencial
    const nextCode = await ActionRepository.getNextCode();

    // 🧩 4. Crear la acción
    const newAction = await ActionRepository.create({
      code: nextCode,
      code_improvement,
      code_objective,
      title,
      description,
      state: "P", // Pendiente
      register_date: new Date(),
      final_date: null,
      code_user: userCode,
      code_user_completed: null,
    });

    return newAction;
  } catch (error) {
    // Si el error ya es un AppError, lo lanzamos tal cual
    if (error.status) throw error;

    // Si no, lo convertimos en un InternalServerError genérico
    throw new InternalServerError("Error interno al crear la acción");
  }
};

export default { createActionService };