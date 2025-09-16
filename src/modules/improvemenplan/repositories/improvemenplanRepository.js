// src/modules/improvementplan/repositories/improvementplan.repository.js
import ImprovementPlan from "../models/improvementplanModel.js";
import User from "../../users/models/userModel.js";
import Timeframe from "../../timeframes/models/timeframesModel.js";

class ImprovementPlanRepository {
  async create(data) {
    return await ImprovementPlan.create(data);
  }

  async findAll() {
    return await ImprovementPlan.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "code", "username"] },
        { model: Timeframe, as: "timeframe", attributes: ["id", "code", "name"] },
      ],
    });
  }

  async findById(id) {
    return await ImprovementPlan.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["id", "code", "username"] },
        { model: Timeframe, as: "timeframe", attributes: ["id", "code", "name"] },
      ],
    });
  }

  async findByCode(code) {
    return await ImprovementPlan.findOne({
      where: { code },
      include: [
        { model: User, as: "user", attributes: ["id", "code", "username"] },
        { model: Timeframe, as: "timeframe", attributes: ["id", "code", "name"] },
      ],
    });
  }

  async update(id, data) {
    const plan = await ImprovementPlan.findByPk(id);
    if (!plan) return null;
    return await plan.update(data);
  }

  async delete(id) {
    const plan = await ImprovementPlan.findByPk(id);
    if (!plan) return null;
    await plan.destroy();
    return plan;
  }
}

export default new ImprovementPlanRepository();
