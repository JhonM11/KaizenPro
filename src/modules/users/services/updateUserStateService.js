import userRepository from "../repositories/userRepository.js";

export default async function updateUserStateService(code, state) {
  return await userRepository.updateStateByCode(code, state);
}
