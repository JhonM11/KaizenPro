import cron from "node-cron";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

// Obtiene la URL de producción de Render o usa localhost para el desarrollo
const serverUrl = process.env.RENDER_EXTERNAL_URL || "http://localhost:3000";

// Ejecutar cada 3 minutos
cron.schedule("*/3 * * * *", async () => {
  try {
    // Usa la URL dinámica para la llamada al endpoint
    const response = await axios.get(`${serverUrl}/`);
    console.log("✅ Servicio activo:", response.data);
  } catch (error) {
    console.error("❌ Error al verificar el servicio:", error.message);
  }
});