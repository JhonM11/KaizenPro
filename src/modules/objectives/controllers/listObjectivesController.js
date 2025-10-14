// src/modules/objectives/controllers/listObjectivesController.js
import listObjectivesService from "../services/listObjectivesService.js";

const listObjectivesController = async (req, res, next) => {
  try {
    const list = await listObjectivesService();
    return res.status(200).json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

export default listObjectivesController;
