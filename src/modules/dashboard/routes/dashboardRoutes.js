// src/modules/dashboard/routes/dashboardRoutes.js

/**
 * @swagger
 * tags:
 *   name: Dashboard (WebSocket)
 *   description: Canal en tiempo real para obtener métricas globales del sistema KaizenPro.
 *
 * /api/v1/kaizenpro/dashboard (WebSocket):
 *   get:
 *     summary: Conectarse al canal WebSocket del Dashboard
 *     tags: [Dashboard (WebSocket)]
 *     description: |
 *       Este **endpoint WebSocket** permite recibir en tiempo real las estadísticas del sistema KaizenPro.  
 *       Se utiliza para actualizar automáticamente el panel administrativo sin necesidad de hacer peticiones REST continuas.
 *
 *       ---
 *       ### 🔐 Autenticación requerida
 *       Debes enviar un encabezado (**Header**) con el token JWT válido:
 *
 *       | Header | Descripción |
 *       |---------|-------------|
 *       | `Authorization` | `Bearer <tu_token_de_autenticación>` |
 *
 *       ---
 *       ### 🌐 URL de conexión
 *       - **En local:** `ws://localhost:3000/api/v1/kaizenpro/dashboard`  
 *       - **En producción (Render):** `wss://<tu_dominio_render>.onrender.com/api/v1/kaizenpro/dashboard`
 *
 *       ---
 *       ### 📡 Eventos disponibles
 *       | Evento | Descripción |
 *       |---------|-------------|
 *       | `dashboard:update` | Envía el conjunto completo de métricas actualizadas. |
 *       | `dashboard:error` | Envía un mensaje de error si ocurre un problema en el servidor. |
 *
 *       ---
 *       ### 📥 Ejemplo de conexión en JavaScript (cliente)
 *       ```js
 *       import { io } from "socket.io-client";
 *
 *       const socket = io("wss://kaizenpro.onrender.com/api/v1/kaizenpro/dashboard", {
 *         extraHeaders: {
 *           Authorization: "Bearer TU_TOKEN_AQUI"
 *         }
 *       });
 *
 *       socket.on("connect", () => {
 *         console.log("✅ Conectado al Dashboard WebSocket");
 *       });
 *
 *       socket.on("dashboard:update", (data) => {
 *         console.log("📊 Datos del Dashboard recibidos:", data);
 *       });
 *
 *       socket.on("disconnect", () => {
 *         console.log("❌ Desconectado del servidor");
 *       });
 *       ```
 *
 *       ---
 *       ### 📤 Ejemplo de conexión en Postman
 *       1. Abre **Postman** → Pestaña **New → WebSocket Request**  
 *       2. Usa la URL según el entorno:
 *          - `ws://localhost:3000/api/v1/kaizenpro/dashboard`
 *          - `wss://kaizenpro.onrender.com/api/v1/kaizenpro/dashboard`
 *       3. En la pestaña **Headers**, agrega:
 *          - **Key:** `Authorization`  
 *          - **Value:** `Bearer TU_TOKEN_AQUI`
 *       4. Da clic en **Connect** y escucha el evento `dashboard:update`
 *
 *       ---
 *       ### 🧾 Ejemplo de respuesta (`dashboard:update`)
 *       ```json
 *       {
 *         "users": [
 *           { "concepto": "Total de Usuarios", "cantidad": "14" },
 *           { "concepto": "Total de Usuarios Activos", "cantidad": "11" },
 *           { "concepto": "Total de Usuarios Inactivos", "cantidad": "3" }
 *         ],
 *         "improvementData": [
 *           { "concepto": "Total de planes", "cantidad": "7" },
 *           { "concepto": "Total de planes Pendientes", "cantidad": "1" },
 *           { "concepto": "Total de planes Finalizados", "cantidad": "6" }
 *         ],
 *         "objectivesData": [
 *           { "concepto": "Total de Objetivos", "cantidad": "10" },
 *           { "concepto": "Total de Objetivos Pendientes", "cantidad": "5" },
 *           { "concepto": "Total de Objetivos Desarrollados", "cantidad": "5" }
 *         ],
 *         "actionsData": [
 *           { "concepto": "Total de Acciones", "cantidad": "7" },
 *           { "concepto": "Total de Acciones Pendientes", "cantidad": "1" },
 *           { "concepto": "Total de Acciones Desarrolladas", "cantidad": "6" }
 *         ],
 *         "timeFrames": [
 *           { "concepto": "Total de TimeFrames", "cantidad": "5" }
 *         ],
 *         "typeObjectives": [
 *           { "concepto": "Total de Tipo Objetivos", "cantidad": "12" }
 *         ]
 *       }
 *       ```
 *
 *       ---
 *       ### ⚙️ Notas adicionales
 *       - El servidor envía los datos automáticamente al conectarse.  
 *       - No requiere enviar mensajes al servidor; sólo escuchar el evento `dashboard:update`.  
 *       - Si el token expira o es inválido, la conexión será rechazada con un error de autenticación.
 */
import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

// Endpoint informativo (no real-time desde Swagger)
router.get("/", getDashboardStats);

export default router;
