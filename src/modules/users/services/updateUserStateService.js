import userRepository from "../repositories/userRepository.js";
import { emitDashboardUpdate } from "../../dashboard/utils/dashboardEmitter.js";

export default async function updateUserStateService(code, state) {

  const updateStateUser = await userRepository.updateStateByCode(code, state);

  try {
    await emitDashboardUpdate();
  } catch (error) {
    console.error("⚠️ Error al emitir actualización de dashboard (deleteUser):", error.message);
  }

  return updateStateUser
}
