// src/modules/improvementplan/repositories/improvementplan.repository.js
import ImprovementPlan from "../models/improvemenplanModel.js";
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
      order: [["code", "ASC"]],
    });
  }

  async findMaxCode() {
    const max = await ImprovementPlan.max("code");
    return max || 0;
  }
}

export default new ImprovementPlanRepository();
