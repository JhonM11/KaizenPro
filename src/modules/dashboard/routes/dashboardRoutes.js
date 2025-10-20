// src/modules/dashboard/routes/dashboardRoutes.js

/**
 * @swagger
 * tags:
 *   name: Dashboard (Socket.IO)
 *   description: Canal en tiempo real (basado en Socket.IO) para obtener métricas globales del sistema KaizenPro.
 *
 * /api/v1/kaizenpro/dashboard (Socket.IO):
 *   get:
 *     summary: Conectarse al canal Socket.IO del Dashboard
 *     tags: [Dashboard (Socket.IO)]
 *     description: |
 *       Este **canal de tiempo real** utiliza la librería **Socket.IO** (no WebSocket nativo)  
 *       y permite recibir métricas actualizadas del sistema **KaizenPro** sin necesidad de hacer peticiones REST continuas.
 *
 *       ---
 *       ### ⚙️ Diferencia entre WebSocket nativo y Socket.IO
 *       - Socket.IO se basa en WebSockets, pero **no son lo mismo**.  
 *       - Proporciona funcionalidades adicionales como:
 *         - Reconexión automática.
 *         - Namespaces y rooms.
 *         - Emisión de eventos personalizados (`emit`, `on`).
 *         - Soporte para fallback HTTP cuando WebSocket no está disponible.
 *
 *       ---
 *       ### 🔐 Autenticación requerida
 *       La autenticación se realiza mediante **query string**, no con encabezados HTTP.
 *
 *       Debes incluir tu token JWT válido como parámetro en la URL:
 *
 *       ```
 *       ?token=<tu_token_de_autenticación>
 *       ```
 *
 *       ---
 *       ### 🌐 URL de conexión
 *       - **En local:**  
 *         `ws://localhost:3000/api/v1/kaizenpro/dashboard?token=<tu_token>`
 *
 *       - **En producción (Render):**  
 *         `wss://kaizenpro.onrender.com/api/v1/kaizenpro/dashboard?token=<tu_token>`
 *
 *       *(El protocolo puede ser `ws://` o `wss://` según el entorno.)*
 *
 *       ---
 *       ### 📡 Eventos disponibles
 *       | Evento | Descripción |
 *       |---------|-------------|
 *       | `dashboard:update` | Envía el conjunto completo de métricas actualizadas. |
 *       | `dashboard:error` | Envía un mensaje de error si ocurre un problema en el servidor. |
 *
 *       ---
 *       ### 📥 Ejemplo de conexión con **Socket.IO (JavaScript cliente)**
 *       ```js
 *       import { io } from "socket.io-client";
 *
 *       // 🔗 Conexión con token en query string
 *       const token = "TU_TOKEN_AQUI";
 *       const socket = io(`wss://kaizenpro.onrender.com/api/v1/kaizenpro/dashboard?token=${token}`, {
 *         transports: ["websocket"]
 *       });
 *
 *       socket.on("connect", () => {
 *         console.log("✅ Conectado al Dashboard (Socket.IO)");
 *       });
 *
 *       socket.on("dashboard:update", (data) => {
 *         console.log("📊 Datos recibidos:", data);
 *       });
 *
 *       socket.on("dashboard:error", (err) => {
 *         console.error("❌ Error del Dashboard:", err.message);
 *       });
 *
 *       socket.on("disconnect", () => {
 *         console.log("🔌 Desconectado del servidor");
 *       });
 *       ```
 *
 *       ---
 *       ### 📤 Ejemplo de conexión con **Postman**
 *       1. Abre **Postman** → pestaña **New → Socket.IO Request**  
 *          *(⚠️ No WebSocket Request, ya que usa protocolo Socket.IO)*  
 *       2. Usa la URL según el entorno:
 *          - `ws://localhost:3000/api/v1/kaizenpro/dashboard?token=<tu_token>`
 *          - `wss://kaizenpro.onrender.com/api/v1/kaizenpro/dashboard?token=<tu_token>`
 *       3. No agregues ningún Header.
 *       4. Conéctate y escucha el evento `dashboard:update`.
 *
 *       ---
 *       ### 🧾 Ejemplo de respuesta (`dashboard:update`)
 *       ```json
 *       {
 *         "users": [
 *           { "concepto": "Total de Usuarios", "cantidad": "14" },
 *           { "concepto": "Usuarios Activos", "cantidad": "11" },
 *           { "concepto": "Usuarios Inactivos", "cantidad": "3" }
 *         ],
 *         "improvementData": [
 *           { "concepto": "Total de Planes", "cantidad": "7" },
 *           { "concepto": "Pendientes", "cantidad": "1" },
 *           { "concepto": "Finalizados", "cantidad": "6" }
 *         ]
 *       }
 *       ```
 *
 *       ---
 *       ### ⚙️ Notas adicionales
 *       - No se requiere enviar mensajes al servidor; basta con escuchar `dashboard:update`.  
 *       - Si el token es inválido o ha expirado, la conexión será rechazada.  
 *       - En caso de desconexión, Socket.IO intentará reconectarse automáticamente.
 */

import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

// Endpoint informativo (solo para Swagger, no WebSocket real)
router.get("/", getDashboardStats);

export default router;
