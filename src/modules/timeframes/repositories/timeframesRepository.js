// src/modules/timeframes/repositories/timeframeRepository.js
import Timeframe from "../models/timeframesModel.js";

const TimeframeRepository = {
  findByCode: async (code) => {
    return await Timeframe.findOne({ where: { code } });
  },

  findAll: async () => {
    return await Timeframe.findAll({ order: [["code", "ASC"]] });
  },

  getMaxCode: async () => {
    const max = await Timeframe.max("code");
    return max || 0;
  },

  create: async (data) => {
    return await Timeframe.create(data);
  },

  updateName: async (code, name) => {
    const timeframe = await Timeframe.findOne({ where: { code } });
    if (!timeframe) return null;
    timeframe.name = name;
    await timeframe.save();
    return timeframe;
  },

  updateExtensionDate: async (code, extension_date) => {
    const timeframe = await Timeframe.findOne({ where: { code } });
    if (!timeframe) return null;
    timeframe.extension_date = extension_date;
    await timeframe.save();
    return timeframe;
  },
};

export default TimeframeRepository;
