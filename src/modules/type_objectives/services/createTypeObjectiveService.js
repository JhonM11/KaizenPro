// src/modules/type_objectives/services/createTypeObjectiveService.js
import TypeObjectiveRepository from "../repositories/typeObjectiveRepository.js";
import TypeObjectiveListDTO from "../dtos/typeObjectiveListDTO.js";
import { ConflictError, BadRequestError } from "../../../utils/customErrors.js";

const createTypeObjectiveService = async (name, user) => {
  if (!name) {
    throw new BadRequestError("El parámetro 'name' es requerido");
  }

  // Buscar el último code registrado y autoincrementar
  const lastTypeObjective = await TypeObjectiveRepository.findLast();
  const newCode = lastTypeObjective ? lastTypeObjective.code + 1 : 1;

  // Validar duplicado por nombre
  const exists = await TypeObjectiveRepository.findByName(name);
  if (exists) {
    throw new ConflictError(`El nombre '${name}' ya está registrado`);
  }

  // Crear el nuevo type_objective
  const newTypeObjective = await TypeObjectiveRepository.create({
    code: newCode,
    name,
    register_date: new Date(),
    code_user_create: user.code,
  });

  return new TypeObjectiveListDTO(newTypeObjective);
};

export default createTypeObjectiveService;
