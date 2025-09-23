// src/modules/type_objectives/controllers/createTypeObjectiveController.js
import createTypeObjectiveService from "../services/createTypeObjectiveService.js";

const createTypeObjectiveController = async (req, res, next) => {
  try {
    const { name } = req.query; // 🔹 Ahora viene como parámetro
    const user = req.user;

    const result = await createTypeObjectiveService(name, user);

    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export default createTypeObjectiveController;
