import updateUserStateService from "../services/updateUserStateService.js";
import { BadRequestError, NotFoundError } from "../../../utils/customErrors.js";

export default async function updateUserStateController(req, res, next) {
  try {
    const { code, state } = req.query;

    if (!code) {
      throw new BadRequestError("El parámetro 'code' es requerido");
    }
    if (!["A", "I"].includes(state)) {
      throw new BadRequestError("El estado debe ser 'A' (Activo) o 'I' (Inactivo)");
    }

    const updatedUser = await updateUserStateService(code, state);
    if (!updatedUser) {
      throw new NotFoundError(`Usuario con code '${code}' no encontrado`);
    }

    res.status(200).json({
      success: true,
      message: `Estado del usuario actualizado a '${state}'`,
      user: {
        code: updatedUser.code,
        username: updatedUser.username,
        state: updatedUser.state,
      },
    });
  } catch (error) {
    next(error);
  }
}
