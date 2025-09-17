import authService from "./authService.js";

const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const { token, user } = await authService.login({ username, password });

      res.status(200).json({
        message: "Login exitoso",
        token,
      });
    } catch (error) {
      console.error("❌ Error en login:", error.message);
      res.status(401).json({ message: error.message });
    }
  },
};

export default authController;
