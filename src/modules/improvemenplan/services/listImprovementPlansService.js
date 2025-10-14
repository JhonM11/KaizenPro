// src/modules/improvementplan/services/listImprovementPlansService.js
import ImprovementPlanRepository from "../repositories/improvemenplanRepository.js";
import ImprovementPlanListDTO from "../dtos/improvementPlanListDTO.js";

const listImprovementPlansService = async () => {
  const plans = await ImprovementPlanRepository.findAll();
  return plans.map((p) => new ImprovementPlanListDTO(p));
};

export default listImprovementPlansService;
