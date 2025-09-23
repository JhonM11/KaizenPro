import userRepository from "../repositories/userRepository.js";
import userContextDTO from "../dtos/userContextDTO.js";

export default async function getUserContextService(username) {
  // Buscar usuario por username (que viene del token/session)
  const user = await userRepository.findByUsername(username);

  if (!user) {
    return null;
  }

  return userContextDTO(user);
}
