import authMiddleware from "./authMiddleware.js";
import errorHandlerMiddleware from "./errorHandlerMiddleware.js";

const middlewares = {
  authMiddleware,
  errorHandlerMiddleware,
};

export default middlewares;
