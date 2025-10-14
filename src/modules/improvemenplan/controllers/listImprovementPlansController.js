// src/modules/improvementplan/controllers/listImprovementPlansController.js
import listImprovementPlansService from "../services/listImprovementPlansService.js";

const listImprovementPlansController = async (req, res, next) => {
  try {
    const result = await listImprovementPlansService();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default listImprovementPlansController;
