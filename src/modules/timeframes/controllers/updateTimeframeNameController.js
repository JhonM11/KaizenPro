import updateTimeframeNameService from "../services/updateTimeframeNameService.js";

const updateTimeframeNameController = async (req, res, next) => {
  try {
    const { code, name } = req.query;

    const dto = await updateTimeframeNameService(code, name);

    res.status(200).json({
      success: true,
      message: "Nombre actualizado correctamente",
      data: dto,
    });
  } catch (err) {
    next(err);
  }
};

export default updateTimeframeNameController;
