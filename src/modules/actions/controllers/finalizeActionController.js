// src/modules/actions/controllers/finalizeActionController.js
import finalizeActionService from "../services/finalizeActionService.js";

const finalizeActionController = async (req, res) => {
  try {
    const { code } = req.query;
    const userCode = req.user?.code;

    const action = await finalizeActionService.finalizeActionService(code, userCode);

    return res.status(200).json({
      success: true,
      message: `Acción ${action.code} finalizada correctamente.`,
    });
  } catch (error) {
    console.error("❌ Error al finalizar acción:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error interno del servidor.",
    });
  }
};

export default finalizeActionController;
