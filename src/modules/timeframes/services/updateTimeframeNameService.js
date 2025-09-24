import TimeframeRepository from "../repositories/timeframesRepository.js";
import TimeframeListDTO from "../dtos/timeframeListDTO.js";
import { NotFoundError, BadRequestError } from "../../../utils/customErrors.js";

const updateTimeframeNameService = async (code, name) => {
  if (!code || !name) {
    throw new BadRequestError("Debe proporcionar 'code' y 'name'");
  }

  const timeframe = await TimeframeRepository.findByCode(code);
  if (!timeframe) {
    throw new NotFoundError(`Timeframe con code ${code} no existe`);
  }

  timeframe.name = name;
  await timeframe.save();

  return new TimeframeListDTO(timeframe);
};

export default updateTimeframeNameService;
