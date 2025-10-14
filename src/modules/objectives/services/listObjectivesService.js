// src/modules/objectives/services/listObjectivesService.js
import objectiveRepository from "../repositories/objectiveRepository.js";
import ObjectiveListDTO from "../dtos/objectiveListDTO.js";
import { InternalServerError } from "../../../utils/customErrors.js";

const listObjectivesService = async () => {
  try {
    const objectives = await objectiveRepository.findAll();
    return objectives.map((o) => new ObjectiveListDTO(o));
  } catch (error) {
    throw new InternalServerError("Error al listar los objetivos");
  }
};

export default listObjectivesService;
