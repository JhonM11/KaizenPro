// src/modules/actions/repositories/actionsRepository.js
import { Action } from "../models/actionsModel.js";

export const ActionRepository = {
  async create(data) {
    return await Action.create(data);
  },

  async findAll() {
    return await Action.findAll({ include: ["objective"] });
  },

  async findByCode(code) {
    return await Action.findOne({ where: { code }, include: ["objective"] });
  },

  async getNextCode() {
    const lastAction = await Action.findOne({
      order: [["code", "DESC"]],
    });
    return lastAction ? lastAction.code + 1 : 1;
  },

  async save(action) {
    return await action.save();
  },
};
