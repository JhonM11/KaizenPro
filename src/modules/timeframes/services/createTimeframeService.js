// src/modules/timeframes/services/createTimeframeService.js
import TimeframeRepository from "../repositories/timeframesRepository.js";
import TimeframeListDTO from "../dtos/timeframeListDTO.js";
import { validateCreateTimeframePayload } from "../payloads/createTimeframePayload.js";
import { emitDashboardUpdate } from "../../dashboard/utils/dashboardEmitter.js";

const createTimeframeService = async (payload, user) => {
  const data = validateCreateTimeframePayload(payload);

  const nextCode = (await TimeframeRepository.getMaxCode()) + 1;

  const newTimeframe = await TimeframeRepository.create({
    code: nextCode,
    name: data.name,
    start_date: data.start_date,
    final_date: data.final_date,
    extension_date: null,
    code_user_register: user.code,
  });


  //Emitir evento a websocket
  await emitDashboardUpdate();

  return new TimeframeListDTO(newTimeframe);
};

export default createTimeframeService;
