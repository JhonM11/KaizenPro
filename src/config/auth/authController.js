import authService from "./authService.js";
import { BadRequestError } from "../../utils/customErrors.js";


const authController = {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new BadRequestError("El username y password son requeridos");
      }

      const { token } = await authService.login({ username, password });

      res.status(200).json({
        success: true,
        message: "Login exitoso",
        token,
      });
    } catch (error) {
      next(error); // 👈 delegamos al middleware global
    }
  },
};

export default authController;
