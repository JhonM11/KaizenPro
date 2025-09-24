// src/modules/timeframes/controllers/listTimeframesController.js
import listTimeframesService from "../services/listTimeframesService.js";

const listTimeframesController = async (req, res, next) => {
  try {
    const result = await listTimeframesService();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
export default listTimeframesController;
