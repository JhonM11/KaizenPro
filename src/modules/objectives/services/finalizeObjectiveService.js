// src/modules/objectives/services/finalizeObjectiveService.js

import ObjectiveRepository from "../repositories/objectiveRepository.js";
import { NotFoundError, ConflictError } from "../../../utils/customErrors.js";

const finalizeObjectiveService = async (code, userCode) => {
  const objective = await ObjectiveRepository.findByCode(code);

  if (!objective) {
    throw new NotFoundError(`El objetivo con código ${code} no existe.`);
  }

  if (objective.state === "D") {
    // 409 Conflict → recurso ya en el estado final
    throw new ConflictError(`El objetivo con código ${code} ya está finalizado.`);
  }

  // ✅ Actualizamos el estado y datos
  objective.state = "D";
  objective.final_date = new Date();
  objective.code_user_completed = userCode;

  await objective.save();

  return objective;
};

export default finalizeObjectiveService;
