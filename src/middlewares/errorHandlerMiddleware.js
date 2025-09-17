const errorHandlerMiddleware = (err, req, res, next) => {
  console.error("❌ Error capturado:", err);

  // Si es un error personalizado, ya trae status
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Error interno en el servidor",
  });
};

export default errorHandlerMiddleware;
