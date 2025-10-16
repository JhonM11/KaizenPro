// src/modules/actions/controllers/createActionController.js
import { validateCreateActionPayload } from "../payloads/createActionPayload.js";
import createActionService from "../services/createActionService.js";

const createActionController = async (req, res) => {
  try {
    const validationError = validateCreateActionPayload(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const userCode = req.user?.code;
    const newAction = await createActionService.createActionService(req.body, userCode);

    return res.status(201).json({
      success: true,
      message: `Acción '${newAction.title}' creada correctamente`,
    });
  } catch (error) {
    console.error("❌ Error al crear acción:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error interno del servidor.",
    });
  }
};

export default createActionController;