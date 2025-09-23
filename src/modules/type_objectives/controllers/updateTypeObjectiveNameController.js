import updateTypeObjectiveNameService from "../services/updateTypeObjectiveNameService.js";

const updateTypeObjectiveNameController = async (req, res, next) => {
  try {
    const { code, name } = req.query; // 👈 params
    const result = await updateTypeObjectiveNameService(code, name);

    res.status(200).json({
      success: true,
      message: "Nombre actualizado correctamente",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default updateTypeObjectiveNameController;
