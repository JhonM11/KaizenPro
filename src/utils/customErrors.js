class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}

// 🧩 Errores 4xx — del cliente
export class BadRequestError extends AppError {
  constructor(message = "Solicitud inválida") {
    super(message, 400);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Error de validación en los datos enviados") {
    super(message, 422);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "No autorizado") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Acceso prohibido") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

export class ResourceNotFoundError extends AppError {
  constructor(message = "El recurso solicitado no existe") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflicto de datos") {
    super(message, 409);
  }
}

export class AlreadyFinalizedError extends AppError {
  constructor(message = "El recurso ya está finalizado") {
    super(message, 409);
  }
}

export class DependencyError extends AppError {
  constructor(message = "Recurso dependiente no encontrado o inválido") {
    super(message, 424); // 424: Failed Dependency
  }
}

// 🧱 Errores 5xx — del servidor
export class InternalServerError extends AppError {
  constructor(message = "Error interno del servidor") {
    super(message, 500);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Error al acceder a la base de datos") {
    super(message, 500);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = "Servicio no disponible temporalmente") {
    super(message, 503);
  }
}

export { AppError };
