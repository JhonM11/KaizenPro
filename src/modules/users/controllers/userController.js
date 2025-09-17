import userService from "../services/userService.js";

const userController = {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);

      res.status(201).json({
        message: "Usuario creado con éxito",
        user: {
          username: user.username,
          role: user.role,
          register_date: user.register_date,
        },
      });
    } catch (error) {
      console.error("Error al crear usuario:", error.message);

      // Si el error es por validación, responder con 400
      if (error.message.includes("usuario ya existe")) {
        return res.status(400).json({ message: error.message });
      }

      // Si es cualquier otro error, mandar 500
      res.status(500).json({ message: "Error interno al crear usuario" });
    }
  },
};

export default userController;
