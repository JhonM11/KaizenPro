import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import userRepository from "../repositories/userRepository.js";

const userService = {
  async createUser(data) {
    const { username, role, state, mail, phone } = data;

    // 0. Validar si el username ya existe
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("❌ El nombre de usuario ya existe, elige otro.");
    }

    // 1. Password por defecto = username (pero hasheado)
    const hashedPassword = await bcrypt.hash(username, 10);

    // 2. Armar objeto usuario
    const newUser = {
      code: uuidv4(),
      username,
      password: hashedPassword,
      role,
      state,
      register_date: new Date(),
      mail,
      phone,
    };

    // 3. Guardar en la BD
    return await userRepository.create(newUser);
  },
};

export default userService;
