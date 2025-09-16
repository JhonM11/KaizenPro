// src/modules/timeframes/repositories/timeframe.repository.js
import Timeframe from "../models/timeframesModel.js";

class TimeframeRepository {
  async create(data) {
    return await Timeframe.create(data);
  }

  async findAll() {
    return await Timeframe.findAll();
  }

  async findById(id) {
    return await Timeframe.findByPk(id);
  }

  async findByCode(code) {
    return await Timeframe.findOne({ where: { code } });
  }

  async update(id, data) {
    const timeframe = await Timeframe.findByPk(id);
    if (!timeframe) return null;
    return await timeframe.update(data);
  }

  async delete(id) {
    const timeframe = await Timeframe.findByPk(id);
    if (!timeframe) return null;
    await timeframe.destroy();
    return timeframe;
  }
}

export default new TimeframeRepository();
