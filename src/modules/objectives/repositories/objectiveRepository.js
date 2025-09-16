// src/modules/objectives/repositories/objective.repository.js
import Objective from "../models/objectiveModel.js";
import ImprovementPlan from "../../improvemenplan/models/improvemenplanModel.js";
import TypeObjective from "../../type_objectives/models/type_objectiveModel.js";

class ObjectiveRepository {
  async create(data) {
    return await Objective.create(data);
  }

  async findAll() {
    return await Objective.findAll({
      include: [
        { model: ImprovementPlan, as: "improvementPlan", attributes: ["id", "code", "title"] },
        { model: TypeObjective, as: "typeObjective", attributes: ["id", "code", "name"] },
      ],
    });
  }

  async findById(id) {
    return await Objective.findByPk(id, {
      include: [
        { model: ImprovementPlan, as: "improvementPlan", attributes: ["id", "code", "title"] },
        { model: TypeObjective, as: "typeObjective", attributes: ["id", "code", "name"] },
      ],
    });
  }

  async findByCode(code) {
    return await Objective.findOne({
      where: { code },
      include: [
        { model: ImprovementPlan, as: "improvementPlan", attributes: ["id", "code", "title"] },
        { model: TypeObjective, as: "typeObjective", attributes: ["id", "code", "name"] },
      ],
    });
  }

  async update(id, data) {
    const objective = await Objective.findByPk(id);
    if (!objective) return null;
    return await objective.update(data);
  }

  async delete(id) {
    const objective = await Objective.findByPk(id);
    if (!objective) return null;
    await objective.destroy();
    return objective;
  }
}

export default new ObjectiveRepository();
