import deleteUserService from "../services/deleteUserService.js";
import { BadRequestError, NotFoundError } from "../../../utils/customErrors.js";

export default async function deleteUserController(req, res, next) {
  try {
    const { code } = req.query;
    if (!code) {
      throw new BadRequestError("El parámetro 'code' es requerido");
    }

    const deletedUser = await deleteUserService(code);
    if (!deletedUser) {
      throw new NotFoundError(`Usuario con code '${code}' no encontrado`);
    }

    res.status(200).json({
      success: true,
      message: `Usuario con code ${code} eliminado correctamente`,
    });
  } catch (error) {
    next(error);
  }
}
