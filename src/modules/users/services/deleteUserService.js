import userRepository from "../repositories/userRepository.js";
import { emitDashboardUpdate } from "../../dashboard/utils/dashboardEmitter.js";

export default async function deleteUserService(code) {
  
  const deletedUser = await userRepository.deleteByCode(code);

  // Luego emitir actualización al dashboard
  try {
    await emitDashboardUpdate();
  } catch (error) {
    console.error("⚠️ Error al emitir actualización de dashboard (deleteUser):", error.message);
  }

  return deletedUser;
}