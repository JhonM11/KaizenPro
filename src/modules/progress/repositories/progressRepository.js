// src/repositories/progress.repository.js
import { Progress } from "../models/progressModel.js";

export const ProgressRepository = {
  async create(progressData) {
    return await Progress.create(progressData);
  },

  async findAll() {
    return await Progress.findAll({ include: ["action"] });
  },

  async findById(id) {
    return await Progress.findByPk(id, { include: ["action"] });
  },

  async findByCode(code) {
    return await Progress.findOne({ where: { code }, include: ["action"] });
  },

  async updateById(id, updateData) {
    const progress = await Progress.findByPk(id);
    if (!progress) return null;
    return await progress.update(updateData);
  },

  async deleteById(id) {
    const progress = await Progress.findByPk(id);
    if (!progress) return null;
    await progress.destroy();
    return progress;
  },
};
