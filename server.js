// server.js
import app from "./app.js";
import http from "http";
import sequelize from "./src/config/sequelize.js";
import "./src/config/healthCheck.js";
import { initDashboardSocket } from "./src/modules/dashboard/sockets/dashboardSocket.js";

const PORT = process.env.PORT || 3000;

// Modelos
import "./src/modules/users/models/userModel.js";
import "./src/modules/timeframes/models/timeframesModel.js";
import "./src/modules/improvemenplan/models/improvemenplanModel.js";
import "./src/modules/type_objectives/models/type_objectiveModel.js";
import "./src/modules/objectives/models/objectiveModel.js";
import "./src/modules/progress/models/progressModel.js";
import "./src/modules/actions/models/actionsModel.js";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con PostgreSQL");

    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas");

    // Crear servidor HTTP
    const server = http.createServer(app);

    // Inicializar Socket.IO
    const io = initDashboardSocket(server);
    console.log("📡 Socket.IO inicializado correctamente");

    server.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error conectando a la BD:", error);
    process.exit(1);
  }
};

startServer();
