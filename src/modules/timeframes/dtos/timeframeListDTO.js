// src/modules/timeframes/dtos/timeframeListDTO.js
class TimeframeListDTO {
  constructor(timeframe) {
    this.code = timeframe.code;
    this.name = timeframe.name;
    this.start_date = timeframe.start_date;
    this.final_date = timeframe.final_date;
    this.extension_date = timeframe.extension_date || null;
  }
}

export default TimeframeListDTO;
