// src/modules/improvementplan/controllers/finalizeImprovementPlanController.js
import finalizeImprovementPlanService from "../services/finalizeImprovementPlanService.js";

const finalizeImprovementPlanController = async (req, res, next) => {
  try {
    const { code } = req.query;
    const plan = await finalizeImprovementPlanService(code);

    res.status(200).json({
      success: true,
      message: `Plan de mejora '${plan.title}' se ha finalizado correctamente`,
    });
  } catch (err) {
    next(err);
  }
};

export default finalizeImprovementPlanController;
