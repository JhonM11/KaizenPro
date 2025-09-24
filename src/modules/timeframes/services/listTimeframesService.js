// src/modules/timeframes/services/listTimeframesService.js
import TimeframeRepository from "../repositories/timeframesRepository.js";
import TimeframeListDTO from "../dtos/timeframeListDTO.js";

const listTimeframesService = async () => {
  const timeframes = await TimeframeRepository.findAll();
  return timeframes.map((t) => new TimeframeListDTO(t));
};

export default listTimeframesService;
