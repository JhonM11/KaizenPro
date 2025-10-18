// src/modules/dashboard/sockets/dashboardSocket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { getDashboardData } from "../services/dashboardService.js";
import { setSocketServerInstance } from "../../../config/socket.js";

export const initDashboardSocket = (httpServer) => {
  // 🌍 Detectar entorno y construir la URL base del socket
  const baseSocketURL =
    process.env.RENDER_EXTERNAL_URL
      ? `${process.env.RENDER_EXTERNAL_URL.replace(/^http/, "ws")}/api/v1/kaizenpro/dashboard`
      : "ws://localhost:3000/api/v1/kaizenpro/dashboard";

  // 🔹 Inicializamos Socket.IO con CORS público
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // 🌍 Permitir conexión desde cualquier origen
      methods: ["GET", "POST"],
      credentials: false,
    },
  });

  // 🔹 Guardamos la instancia global (para emitir desde servicios)
  setSocketServerInstance(io);

  console.log("📊 Socket.IO inicializado correctamente");
  console.log(`🔗 Namespace activo → /api/v1/kaizenpro/dashboard`);
  console.log(`🌍 URL WebSocket disponible en: ${baseSocketURL}`);

  // ===============================================================
  // NAMESPACE: /api/v1/kaizenpro/dashboard
  // ===============================================================
  const dashboardNamespace = io.of("/api/v1/kaizenpro/dashboard");

  // 🔸 Middleware de autenticación JWT usando encabezado Authorization
  dashboardNamespace.use((socket, next) => {
    try {
      const authHeader = socket.handshake.headers["authorization"];

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new Error("No autorizado: falta o formato inválido del token"));
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;

      const allowedRoles = ["admin", "lider", "colaborador"];
      if (!allowedRoles.includes(decoded.role)) {
        return next(new Error("Acceso denegado: rol inválido"));
      }

      next();
    } catch (err) {
      next(new Error("Token inválido o expirado"));
    }
  });

  // 🔸 Evento cuando un cliente se conecta
  dashboardNamespace.on("connection", async (socket) => {
    console.log(`✅ Cliente conectado al dashboard: ${socket.user.username}`);

    const sendData = async () => {
      try {
        const data = await getDashboardData();
        socket.emit("dashboard:update", data);
      } catch (error) {
        console.error("❌ Error al enviar datos del dashboard:", error.message);
        socket.emit("dashboard:error", { message: "Error al obtener datos del dashboard" });
      }
    };

    // Enviar datos iniciales
    await sendData();

    // Enviar datos periódicos (opcional)
    // const interval = setInterval(sendData, 30000);

    socket.on("disconnect", () => {
      console.log(`❌ Cliente desconectado: ${socket.user.username}`);
      // clearInterval(interval);
    });
  });

  return io;
};
