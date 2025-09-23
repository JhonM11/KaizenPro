import TypeObjectiveRepository from "../repositories/typeObjectiveRepository.js";
import TypeObjectiveListDTO from "../dtos/typeObjectiveListDTO.js";

const listTypeObjectivesService = async () => {
  const list = await TypeObjectiveRepository.findAll();
  return list.map((item) => new TypeObjectiveListDTO(item));
};

export default listTypeObjectivesService;
