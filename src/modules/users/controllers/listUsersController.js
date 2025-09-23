import listUsersService from "../services/listUsersService.js";

export default async function listUsersController(req, res, next) {
  try {
    const users = await listUsersService();
    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
}
