// src/modules/improvementplan/dtos/improvementPlanListDTO.js
class ImprovementPlanListDTO {
  constructor(plan) {
    this.code = plan.code;
    this.title = plan.title;
    this.description = plan.description;
    this.comment = plan.comment;
    this.state_improvement = plan.state_improvement;
    this.register_date_create = plan.register_date_create;
    this.final_date = plan.final_date;
    this.code_user = plan.code_user;
    this.code_timeframes = plan.code_timeframes;

    this.timeframe = plan.timeframe
      ? {
          code: plan.timeframe.code,
          name: plan.timeframe.name,
        }
      : null;

    this.user = plan.user
      ? {
          code: plan.user.code,
          username: plan.user.username,
        }
      : null;
  }
}

export default ImprovementPlanListDTO;
