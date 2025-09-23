import TypeObjectiveRepository from "../repositories/typeObjectiveRepository.js";
import TypeObjectiveListDTO from "../dtos/typeObjectiveListDTO.js";
import { NotFoundError, BadRequestError } from "../../../utils/customErrors.js";

const updateTypeObjectiveNameService = async (code, newName) => {
  if (!code || !newName) {
    throw new BadRequestError("Debe proporcionar 'code' y 'name'");
  }

  const updated = await TypeObjectiveRepository.updateName(code, newName);
  if (!updated) {
    throw new NotFoundError(`TypeObjective con code ${code} no existe`);
  }

  return new TypeObjectiveListDTO(updated);
};

export default updateTypeObjectiveNameService;
