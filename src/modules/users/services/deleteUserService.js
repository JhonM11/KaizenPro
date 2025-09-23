import userRepository from "../repositories/userRepository.js";

export default async function deleteUserService(code) {
  return await userRepository.deleteByCode(code);
}
