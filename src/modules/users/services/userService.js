import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import userRepository from "../repositories/userRepository.js";
import { ConflictError } from "../../../utils/customErrors.js";

const userService = {
  async createUser(data) {
    const { username, role, state, mail, phone } = data;

    // Verificar si ya existe
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new ConflictError(`El usuario '${username}' ya existe`);
    }

    // Hashear password = username por defecto
    const hashedPassword = await bcrypt.hash(username, 10);

    const newUser = {
      code: uuidv4(),
      username,
      password: hashedPassword,
      role,
      state: state || "A",
      register_date: new Date(),
      mail,
      phone,
    };

    return await userRepository.create(newUser);
  },
};

export default userService;
