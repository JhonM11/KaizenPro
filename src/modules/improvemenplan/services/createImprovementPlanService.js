// src/modules/improvementplan/services/createImprovementPlanService.js
import ImprovementPlanRepository from "../repositories/improvemenplanRepository.js";
import Timeframe from "../../timeframes/models/timeframesModel.js";
import { validateCreateImprovementPlanPayload } from "../payloads/createImprovementPlanPayload.js";
import ImprovementPlanCreateResponseDTO from "../dtos/improvementPlanCreateResponseDTO.js";
import { NotFoundError } from "../../../utils/customErrors.js";
import { emitDashboardUpdate } from "../../dashboard/utils/dashboardEmitter.js";

const createImprovementPlanService = async (payload, user) => {
  const data = validateCreateImprovementPlanPayload(payload);

  // ✅ Validar que el timeframe exista
  const timeframe = await Timeframe.findOne({ where: { code: data.code_timeframes } });
  if (!timeframe) {
    throw new NotFoundError(`No existe un timeframe con code ${data.code_timeframes}`);
  }

  // Obtener el siguiente código incremental
  const maxCode = await ImprovementPlanRepository.findMaxCode();
  const nextCode = maxCode + 1;

  // Crear el plan de mejora (por defecto "P", sin fecha final)
  const newPlan = await ImprovementPlanRepository.create({
    code: nextCode,
    title: data.title,
    description: data.description,
    comment: data.comment,
    state_improvement: "P",
    register_date_create: new Date(),
    final_date: null,
    code_user: user.code,
    code_timeframes: data.code_timeframes,
  });

  // Emitir evento a websocket
  await emitDashboardUpdate();

return new ImprovementPlanCreateResponseDTO(newPlan);

};

export default createImprovementPlanService;
