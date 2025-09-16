import User from "../models/userModel.js";

const userRepository = {
  async create(data) {
    return await User.create(data);
  },

  async findById(id) {
    return await User.findByPk(id);
  },

  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  },

  async findAll() {
    return await User.findAll({ order: [["register_date", "DESC"]] });
  },

  async updateState(id, state) {
    const user = await User.findByPk(id);
    if (!user) return null;
    user.state = state;
    return await user.save();
  },

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  }
};

export default userRepository;
