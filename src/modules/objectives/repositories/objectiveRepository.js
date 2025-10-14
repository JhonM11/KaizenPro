// src/modules/objectives/repositories/objective.repository.js
import Objective from "../models/objectiveModel.js";
import ImprovementPlan from "../../improvemenplan/models/improvemenplanModel.js";
import TypeObjective from "../../type_objectives/models/type_objectiveModel.js";
import { NotFoundError, InternalServerError } from "../../../utils/customErrors.js";

class ObjectiveRepository {
  async create(data) {
    try {
      return await Objective.create(data);
    } catch (error) {
      // Re-lanzar como error controlado para que servicio lo capture
      throw new InternalServerError("Error al crear el objetivo en la base de datos");
    }
  }

  async findAll() {
    try {
      return await Objective.findAll({
        include: [
          { model: ImprovementPlan, as: "improvementPlan", attributes: ["id", "code", "title"] },
          { model: TypeObjective, as: "typeObjective", attributes: ["id", "code", "name"] },
        ],
        order: [["code", "ASC"]],
      });
    } catch (error) {
      throw new InternalServerError("Error al obtener la lista de objetivos");
    }
  }

  async findByCode(code) {
    try {
      const obj = await Objective.findOne({
        where: { code },
        include: [
          { model: ImprovementPlan, as: "improvementPlan", attributes: ["id", "code", "title"] },
          { model: TypeObjective, as: "typeObjective", attributes: ["id", "code", "name"] },
        ],
      });
      if (!obj) throw new NotFoundError("El objetivo no existe");
      return obj;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new InternalServerError("Error al buscar el objetivo por código");
    }
  }

  async getMaxCode() {
    try {
      // devuelve el max code o 0 si no hay registros
      const max = await Objective.max("code");
      return max || 0;
    } catch (error) {
      throw new InternalServerError("Error al obtener el siguiente código para objetivos");
    }
  }
}

export default new ObjectiveRepository();
