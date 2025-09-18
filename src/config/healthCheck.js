import cron from "node-cron";
import axios from "axios";

// Ejecutar cada 3 minutos
cron.schedule("*/3 * * * *", async () => {
  try {
    const response = await axios.get("http://localhost:3000/"); // 👈 usa tu healthcheck
    console.log("✅ Servicio activo:", response.data);
  } catch (error) {
    console.error("❌ Error al verificar el servicio:", error.message);
  }
});
