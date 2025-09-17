import jwt from "jsonwebtoken";
import accessConfig from "../config/accessConfig.js";

const authMiddleware = {
  verifyToken(req, res, next) {
    const path = req.baseUrl + req.path; // ej: /api/v1/kaizenpro/user
    const token = req.headers["authorization"]?.split(" ")[1];

    // 🔹 Permitir rutas públicas
    if (accessConfig.publicRoutes.includes(path)) {
      return next();
    }

    // 🔹 Rechazar si no hay token
    if (!token) {
      return res.status(403).json({ message: "No autorizado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // 🔹 Validar roles en rutas privadas
      const allowedRoles = accessConfig.privateRoutes[path];
      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Acceso denegado: Rol inválido" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  },
};

export default authMiddleware;
