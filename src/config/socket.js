// src/config/socket.js
let ioInstance = null;

export const setSocketServerInstance = (io) => {
  ioInstance = io;
};

export const getSocketServerInstance = () => {
  if (!ioInstance) {
    console.warn("⚠️ Intento de emitir sin que el socket esté inicializado.");
  }
  return ioInstance;
};
