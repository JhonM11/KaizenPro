// src/modules/actions/controllers/listActionsController.js
import listActionsService from "../services/listActionsService.js";

const listActionsController = async (req, res) => {
  try {
    const actions = await listActionsService.listActionsService();
    return res.status(200).json({ success: true, data: actions });
  } catch (error) {
    console.error("❌ Error al listar acciones:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error interno del servidor.",
    });
  }
};

export default listActionsController;
