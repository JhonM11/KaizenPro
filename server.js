import app from "./app.js";
import sequelize from "./src/config/sequelize.js";

const PORT = process.env.PORT || 3000;

//  importa aquí los modelos
import "./src/modules/users/models/userModel.js";
import "./src/modules/timeframes/models/timeframesModel.js";
import "./src/modules/improvemenplan/models/improvemenplanModel.js";
import "./src/modules/type_objectives/models/type_objectiveModel.js";
import "./src/modules/objectives/models/objectiveModel.js";
import "./src/modules/progress/models/progressModel.js";
import "./src/modules/actions/models/actionsModel.js";


const startServer = async () => {
  try {
    // Probar conexión a la BD
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con PostgreSQL");

    // Crear tablas si no existen
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas");

    // Levantar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error conectando a la BD:", error);
    process.exit(1);
  }
};

startServer();
