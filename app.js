// src/app.js
import express from "express";
import logger from "morgan";

const app = express();

// Middlewares
app.use(express.json());
app.use(logger("dev"));

// Rutas
app.get("/hello", (req, res) => {
  res.send("<h1> Hola Mundo! </h1>");
});

export default app;
