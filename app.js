// app.js
import express from "express";
import logger from "morgan";
import { swaggerUi, swaggerSpec } from "./src/config/swagger.js";
import userRoutes from "./src/modules/users/routes/userRoutes.js";
import authRoutes from "./src/config/auth/authRoutes.js";
import typeObjectivesRoutes from "./src/modules/type_objectives/routes/typeObjectiveRoutes.js";
import timeframeRoutes from "./src/modules/timeframes/routes/timeframeRoutes.js";
import improvementPlanRoutes from "./src/modules/improvemenplan/routes/improvementPlanRoutes.js";
import objectivesRoutes from "./src/modules/objectives/routes/objectivesRoutes.js";
import actionsRoutes from "./src/modules/actions/routes/actionsRoutes.js";
import dashboardRoutes from "./src/modules/dashboard/routes/dashboardRoutes.js";

import { NotFoundError } from "./src/utils/customErrors.js";
import middlewares from "./src/middlewares/indexMiddleware.js";

// ✅ Importa configuración de CORS
import { publicCors } from "./src/config/cors.js";

const app = express();

// ============================================================
// 🌐 CORS GLOBAL (API pública)
// ============================================================
app.use(publicCors);

// Middlewares base
app.use(express.json());
app.use(logger("dev"));

// Ruta de documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// ✅ Middleware global de autenticación (se aplica después de CORS)
app.use(middlewares.authMiddleware.verifyToken);

// Rutas principales
app.use("/api/v1/kaizenpro/user", userRoutes);
app.use("/api/v1/kaizenpro/auth", authRoutes);
app.use("/api/v1/kaizenpro/type-objectives", typeObjectivesRoutes);
app.use("/api/v1/kaizenpro/timeframes", timeframeRoutes);
app.use("/api/v1/kaizenpro/improvementplan", improvementPlanRoutes);
app.use("/api/v1/kaizenpro/objectives", objectivesRoutes);
app.use("/api/v1/kaizenpro/actions", actionsRoutes);
app.use("/api/v1/kaizenpro/dashboard", dashboardRoutes);

// ✅ Rutas inexistentes
app.use((req, _res, next) => {
  next(new NotFoundError(`No se encontró recurso: ${req.originalUrl}`));
});

// ✅ Manejo global de errores
app.use(middlewares.errorHandlerMiddleware);

export default app;
