// src/config/cors.js
import cors from "cors";

/**
 * 🌍 Configuración global CORS
 * Esta configuración permite que cualquier dominio
 * consuma la API sin restricciones.
 * Ideal para entornos públicos o APIs abiertas.
 */
export const corsOptions = {
  origin: "*", // Permite solicitudes desde cualquier dominio
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-KaizenPro-Header"], // Opcional
  credentials: false, // No se usan cookies/sesiones 
  optionsSuccessStatus: 204, // Código de respuesta para preflight exitoso
};

// Exportar middleware CORS preconfigurado
export const publicCors = cors(corsOptions);
