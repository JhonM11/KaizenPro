// src/app.js
import express from "express";
import logger from "morgan";

import userRoutes from "./src/modules/users/routes/userRoutes.js";
import authRoutes from "./src/config/auth/authRoutes.js";
import authMiddleware from "./src/config/auth/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(logger("dev"));

// ✅ Aplicar middleware global
app.use(authMiddleware.verifyToken);

// Rutas
app.use("/api/v1/kaizenpro/user", userRoutes);
app.use("/api/v1/kaizenpro/auth", authRoutes);

// Ejemplo de ruta protegida
app.get("/api/v1/kaizenpro/private", (req, res) => {
  res.json({ message: "✅ Acceso autorizado", user: req.user });
});

export default app;
