// src/modules/objectives/controllers/finalizeObjectiveController.js

import finalizeObjectiveService from "../services/finalizeObjectiveService.js";
import { NotFoundError, ConflictError } from "../../../utils/customErrors.js";

const finalizeObjectiveController = async (req, res) => {
  try {
    const { code } = req.query;
    const userCode = req.user?.code;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Debe proporcionar el parámetro 'code' en la URL.",
      });
    }

    const result = await finalizeObjectiveService(code, userCode);

    return res.status(200).json({
      success: true,
      message: `Objetivo ${result.code} finalizado correctamente.`,
    });
  } catch (error) {
    console.error("❌ Error al finalizar objetivo:", error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({ success: false, message: error.message });
    }

    if (error instanceof ConflictError) {
      return res.status(409).json({ success: false, message: error.message });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Error interno del servidor.",
    });
  }
};

export default finalizeObjectiveController;
