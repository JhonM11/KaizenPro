// src/server.js
import app from "./app.js";
import pool from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Validar conexión a la BD
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Conexión a BD lista:", result.rows[0]);

    // Arrancar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error conectando a la BD:", error);
    process.exit(1);
  }
};

startServer();
