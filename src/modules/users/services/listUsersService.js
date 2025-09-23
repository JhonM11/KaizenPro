import userRepository from "../repositories/userRepository.js";
import userListDTO from "../dtos/userListDTO.js";

export default async function listUsersService() {
  const users = await userRepository.findAll();
  return users.map(user => userListDTO(user));
}
