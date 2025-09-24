// src/modules/timeframes/controllers/createTimeframeController.js
import createTimeframeService from "../services/createTimeframeService.js";

const createTimeframeController = async (req, res, next) => {
  try {
    const result = await createTimeframeService(req.body, req.user);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
export default createTimeframeController;
