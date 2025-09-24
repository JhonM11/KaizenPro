import TimeframeRepository from "../repositories/timeframesRepository.js";
import TimeframeListDTO from "../dtos/timeframeListDTO.js";
import { NotFoundError, BadRequestError } from "../../../utils/customErrors.js";

const updateTimeframeExtensionDateService = async (code, extension_date) => {
  if (!code || !extension_date) {
    throw new BadRequestError("Debe proporcionar 'code' y 'extension_date'");
  }

  const timeframe = await TimeframeRepository.findByCode(code);
  if (!timeframe) {
    throw new NotFoundError(`Timeframe con code ${code} no existe`);
  }

  timeframe.extension_date = extension_date;
  await timeframe.save();

  return new TimeframeListDTO(timeframe);
};

export default updateTimeframeExtensionDateService;
