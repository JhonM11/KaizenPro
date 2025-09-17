// src/config/auth/authMiddleware.js
import jwt from "jsonwebtoken";
import accessConfig from "../accessConfig.js";

const authMiddleware = {
  verifyToken(req, res, next) {
    const path = req.baseUrl + req.path; // ruta completa (ej: /api/v1/kaizenpro/user)
    const token = req.headers["authorization"]?.split(" ")[1];

    // 🔹 Si la ruta está en publicRoutes → dejar pasar sin token
    if (accessConfig.publicRoutes.includes(path)) {
      return next();
    }

    // 🔹 Si no hay token → error
    if (!token) {
      return res.status(403).json({ message: "No autorizado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // 🔹 Validar roles si la ruta está en privateRoutes
      const allowedRoles = accessConfig.privateRoutes[path];
      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Acceso denegado: No autorizado" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  },
};

export default authMiddleware;
