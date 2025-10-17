// src/modules/objectives/services/createObjectiveService.js
import objectiveRepository from "../repositories/objectiveRepository.js";
import ImprovementPlan from "../../improvemenplan/models/improvemenplanModel.js";
import TypeObjective from "../../type_objectives/models/type_objectiveModel.js";
import { NotFoundError, BadRequestError } from "../../../utils/customErrors.js";
import { emitDashboardUpdate } from "../../dashboard/utils/dashboardEmitter.js";

const createObjectiveService = async (payload, req) => {
  const { code_improvement, code_type, body } = payload;

  // ✅ Obtener usuario directamente desde req.user
  const user = req.user;
  if (!user || !user.code) {
    throw new BadRequestError("No se pudo obtener el usuario autenticado.");
  }

  // ✅ Validar existencia del plan de mejora
  const improvement = await ImprovementPlan.findOne({ where: { code: code_improvement } });
  if (!improvement) throw new NotFoundError(`No existe un plan de mejora con code ${code_improvement}`);

  // ✅ Validar existencia del tipo de objetivo
  const typeObj = await TypeObjective.findOne({ where: { code: code_type } });
  if (!typeObj) throw new NotFoundError(`No existe un tipo de objetivo con code ${code_type}`);

  // ✅ Calcular el siguiente código secuencial
  const maxCode = await objectiveRepository.getMaxCode();
  const nextCode = maxCode + 1;

  // ✅ Crear el objetivo (sin pasar req)
  const newObj = await objectiveRepository.create({
    code: nextCode,
    code_improvement,
    code_type,
    body,
    state: "P",
    register_date: new Date(),
    final_date: null,
    code_user_create: user.code,
    code_user_completed: null,
  });


  // Emitir evento de actualización al socket
  await emitDashboardUpdate();
  

  return newObj;
};

export default createObjectiveService;
