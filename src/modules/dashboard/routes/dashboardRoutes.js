// src/modules/dashboard/routes/dashboardRoutes.js

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Canal WebSocket para obtener en tiempo real métricas de planes, objetivos y acciones.
 *
 * /api/v1/kaizenpro/dashboard (WebSocket):
 *   get:
 *     summary: Conectarse al canal WebSocket del Dashboard
 *     tags: [Dashboard]
 *     description: >
 *       Canal WebSocket que entrega estadísticas en tiempo real del sistema:
 *
 *       - Total de planes de mejora, pendientes y finalizados  
 *       - Total de objetivos, pendientes y desarrollados  
 *       - Total de acciones, pendientes y desarrolladas  
 *
 *       **URL de conexión:** `ws://localhost:3000/api/v1/kaizenpro/dashboard`
 *
 *       Ejemplo de respuesta:
 *       ```json
 *       {
 *         "success": true,
 *         "data": {
 *           "plans": [
 *             { "concepto": "Total de planes", "cantidad": 10 },
 *             { "concepto": "Total de planes Pendientes", "cantidad": 6 },
 *             { "concepto": "Total de planes Finalizados", "cantidad": 4 }
 *           ],
 *           "objectives": [
 *             { "concepto": "Total de Objetivos", "cantidad": 20 },
 *             { "concepto": "Total de Objetivos Pendientes", "cantidad": 12 },
 *             { "concepto": "Total de Objetivos Desarrollados", "cantidad": 8 }
 *           ],
 *           "actions": [
 *             { "concepto": "Total de Acciones", "cantidad": 35 },
 *             { "concepto": "Total de Acciones Pendientes", "cantidad": 20 },
 *             { "concepto": "Total de Acciones Desarrolladas", "cantidad": 15 }
 *           ]
 *         }
 *       }
 *       ```
 */
import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

// GET → /api/v1/kaizenpro/dashboard
router.get("/", getDashboardStats);

export default router;
