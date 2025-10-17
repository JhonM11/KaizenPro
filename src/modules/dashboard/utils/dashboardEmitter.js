// src/modules/dashboard/utils/dashboardEmitter.js
import { getSocketServerInstance } from "../../../config/socket.js";
import { getDashboardData } from "../services/dashboardService.js";

export const emitDashboardUpdate = async () => {
  const io = getSocketServerInstance();
  if (!io) {
    console.warn("⚠️ No hay instancia de Socket.IO disponible");
    return;
  }

  try {
    const data = await getDashboardData(); // 🔹 Obtiene los datos actuales del dashboard
    const namespace = io.of("/api/v1/kaizenpro/dashboard");

    namespace.emit("dashboard:update", data); // 🔹 Envía los datos actualizados
    console.log("📡 Dashboard actualizado en tiempo real y emitido a los clientes");
  } catch (error) {
    console.error("❌ Error al emitir actualización del dashboard:", error.message);
  }
};
