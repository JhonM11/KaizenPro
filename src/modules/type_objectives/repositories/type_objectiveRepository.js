// src/modules/type_objectives/repositories/type_objective.repository.js
import TypeObjective from "../models/type_objectiveModel.js";

class TypeObjectiveRepository {
  async create(data) {
    return await TypeObjective.create(data);
  }

  async findAll() {
    return await TypeObjective.findAll();
  }

  async findById(id) {
    return await TypeObjective.findByPk(id);
  }

  async findByCode(code) {
    return await TypeObjective.findOne({ where: { code } });
  }

  async update(id, data) {
    const objective = await TypeObjective.findByPk(id);
    if (!objective) return null;
    return await objective.update(data);
  }

  async delete(id) {
    const objective = await TypeObjective.findByPk(id);
    if (!objective) return null;
    await objective.destroy();
    return objective;
  }
}

export default new TypeObjectiveRepository();
