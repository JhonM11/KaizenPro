// src/modules/improvementplan/controllers/createImprovementPlanController.js
import createImprovementPlanService from "../services/createImprovementPlanService.js";

const createImprovementPlanController = async (req, res, next) => {
  try {
    const result = await createImprovementPlanService(req.body, req.user);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default createImprovementPlanController;
