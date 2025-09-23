import listTypeObjectivesService from "../services/listTypeObjectivesService.js";

const listTypeObjectivesController = async (req, res, next) => {
  try {
    const result = await listTypeObjectivesService();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export default listTypeObjectivesController;
