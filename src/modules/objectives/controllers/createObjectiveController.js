// src/modules/objectives/controllers/createObjectiveController.js
import createObjectiveService from "../services/createObjectiveService.js";
import { validateCreateObjectivePayload } from "../payloads/createObjectivePayload.js";

const createObjectiveController = async (req, res, next) => {
  try {
    const value = validateCreateObjectivePayload(req.body);

    // PASAR req para que el servicio obtenga el usuario (no pasar req al repositorio)
    const created = await createObjectiveService(value, req);

    return res.status(201).json({
      success: true,
      message: `Objetivo '${created.body}' creado correctamente`,
    });
  } catch (err) {
    next(err);
  }
};

export default createObjectiveController;
