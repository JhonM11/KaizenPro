import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepository from "../../modules/users/repositories/userRepository.js";
import { UnauthorizedError } from "../../utils/customErrors.js";

const authService = {
  async login({ username, password }) {
    // 1. Buscar usuario
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedError("Usuario o contraseña incorrectos");
    }

    // 2. Validar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Usuario o contraseña incorrectos");
    }

    // 3. Generar token JWT
    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET, // clave secreta en .env
      { expiresIn: "1h" }
    );

    return { token, user };
  },
};

export default authService;
