// src/modules/improvementplan/services/finalizeImprovementPlanService.js
import ImprovementPlan from "../models/improvemenplanModel.js";
import { NotFoundError, ConflictError } from "../../../utils/customErrors.js";

const finalizeImprovementPlanService = async (code) => {
  const plan = await ImprovementPlan.findOne({ where: { code } });
  if (!plan) throw new NotFoundError(`No existe un plan de mejora con código ${code}`);

  if (plan.state_improvement === "F") {
    throw new ConflictError("El plan de mejora ya está finalizado");
  }

  plan.state_improvement = "F";
  plan.final_date = new Date();
  await plan.save();

  return plan;
};

export default finalizeImprovementPlanService;
