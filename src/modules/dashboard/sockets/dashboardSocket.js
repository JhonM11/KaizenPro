// src/modules/dashboard/sockets/dashboardSocket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { getDashboardData } from "../services/dashboardService.js";

export const initDashboardSocket = (httpServer) => {
  // Inicializar Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Namespace dedicado (recomendado para organización)
  const dashboardNamespace = io.of("/api/v1/kaizenpro/dashboard");

  console.log("📊 Socket.IO del dashboard activo en /api/v1/kaizenpro/dashboard");

  // Middleware JWT (válido para Postman o frontend)
  dashboardNamespace.use((socket, next) => {
    const token =
      socket.handshake.auth?.token || // si viene del frontend
      socket.handshake.headers?.authorization?.split(" ")[1] || // si viene en header
      socket.handshake.query?.token; // si viene por query (Postman)

    if (!token) {
      return next(new Error("No autorizado: falta token"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;

      const allowedRoles = ["admin", "lider", "colaborador"];
      if (!allowedRoles.includes(decoded.role)) {
        return next(new Error("Acceso denegado: rol inválido"));
      }

      next();
    } catch (err) {
      return next(new Error("Token inválido o expirado"));
    }
  });

  // Evento de conexión
  dashboardNamespace.on("connection", async (socket) => {
    console.log(`✅ Cliente conectado al dashboard: ${socket.user.username}`);

    const sendData = async () => {
      try {
        const data = await getDashboardData();
        socket.emit("dashboard:update", data);
      } catch (error) {
        socket.emit("dashboard:error", { message: "Error al obtener datos" });
      }
    };

    // Enviar inmediatamente
    await sendData();

    // Actualizar cada 3 segundos
    const interval = setInterval(sendData, 3000);

    socket.on("disconnect", () => {
      console.log(`❌ Cliente desconectado: ${socket.user.username}`);
      clearInterval(interval);
    });
  });

  return io;
};
