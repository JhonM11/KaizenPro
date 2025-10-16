// src/modules/actions/services/listActionsService.js
import { ActionRepository } from "../repositories/actionsRepository.js";
import { actionListDTO } from "../dtos/actionListDTO.js";

const listActionsService = async () => {
  const actions = await ActionRepository.findAll();
  return actions.map(actionListDTO);
};

export default { listActionsService };
