import getUserContextService from "../services/getUserContextService.js";
import { NotFoundError, UnauthorizedError } from "../../../utils/customErrors.js";

export default async function getUserContextController(req, res, next) {
  try {
    // 👀 Tu middleware mete el decoded completo en req.user
    const username = req.user?.username;

    if (!username) {
      throw new UnauthorizedError("Usuario no autenticado");
    }

    const userContext = await getUserContextService(username);

    if (!userContext) {
      throw new NotFoundError("No se encontró información del usuario");
    }

    res.status(200).json({
      success: true,
      user: userContext,
    });
  } catch (error) {
    next(error);
  }
}
