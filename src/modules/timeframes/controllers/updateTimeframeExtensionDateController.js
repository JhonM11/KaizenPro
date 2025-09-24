import updateTimeframeExtensionDateService from "../services/updateTimeframeExtensionDateService.js";

const updateTimeframeExtensionDateController = async (req, res, next) => {
  try {
    const { code, extension_date } = req.query;

    const dto = await updateTimeframeExtensionDateService(code, extension_date);

    res.status(200).json({
      success: true,
      message: "Fecha de extensión actualizada correctamente",
      data: dto,
    });
  } catch (err) {
    next(err);
  }
};

export default updateTimeframeExtensionDateController;
