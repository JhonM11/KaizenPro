import userService from "../services/userService.js";
import { BadRequestError, ConflictError } from "../../../utils/customErrors.js";



const userController = {
  async create(req, res, next) {
    try {
      const { username, role, mail, phone, state } = req.body;

      // Validación básica de campos obligatorios
      if (!username || !role || !mail) {
        throw new BadRequestError("username, role y mail son requeridos");
      }

      // Llamada al servicio
      const user = await userService.createUser({ username, role, mail, phone, state });

      res.status(201).json({
        success: true,
        message: "Usuario creado con éxito",
        user: {
          username: user.username,
          role: user.role,
          register_date: user.register_date,
        },
      });
    } catch (error) {
      // Si ya existe el usuario, marcamos el conflicto explícitamente
      if (error.message.includes("ya existe")) {
        return next(new ConflictError(error.message));
      }

      next(error); // delega al middleware global
    }
  },
};

export default userController;
