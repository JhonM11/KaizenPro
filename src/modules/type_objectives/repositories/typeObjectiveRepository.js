import TypeObjective from "../models/type_objectiveModel.js";

const TypeObjectiveRepository = {
  async create(data) {
    return await TypeObjective.create(data);
  },

  async findAll() {
    return await TypeObjective.findAll();
  },

    async findByName(name) {
    return await TypeObjective.findOne({ where: { name } });
  },

  async findLast() {
    return await TypeObjective.findOne({
      order: [["code", "DESC"]],
    });
  },

  async findByCode(code) {
    return await TypeObjective.findOne({ where: { code } });
  },

  async updateName(code, name) {
    const typeObjective = await this.findByCode(code);
    if (!typeObjective) return null;

    typeObjective.name = name;
    await typeObjective.save();
    return typeObjective;
  },
};

export default TypeObjectiveRepository;
