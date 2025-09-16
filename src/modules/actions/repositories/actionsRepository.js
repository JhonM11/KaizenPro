// src/repositories/action.repository.js
import { Action } from "../models/actionsModel.js";

export const ActionRepository = {
  async create(actionData) {
    return await Action.create(actionData);
  },

  async findAll() {
    return await Action.findAll({ include: ["objective"] });
  },

  async findById(id) {
    return await Action.findByPk(id, { include: ["objective"] });
  },

  async findByCode(code) {
    return await Action.findOne({ where: { code }, include: ["objective"] });
  },

  async updateById(id, updateData) {
    const action = await Action.findByPk(id);
    if (!action) return null;
    return await action.update(updateData);
  },

  async deleteById(id) {
    const action = await Action.findByPk(id);
    if (!action) return null;
    await action.destroy();
    return action;
  },
};
