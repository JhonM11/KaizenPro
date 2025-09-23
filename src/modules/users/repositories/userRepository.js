import User from "../models/userModel.js";

const userRepository = {
  async create(data) {
    return await User.create(data);
  },

  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  },

  async findAll() {
    return await User.findAll({ order: [["register_date", "DESC"]] });
  },

  async updateStateByCode(code, state) {
    const user = await User.findOne({ where: { code } });
    if (!user) return null;
    user.state = state;
    return await user.save();
  },

  async deleteByCode(code) {
    const user = await User.findOne({ where: { code } });
    if (!user) return null;
    await user.destroy();
    return user;
  },
};

export default userRepository;
