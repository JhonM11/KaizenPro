// src/modules/objectives/dtos/objectiveListDTO.js
class ObjectiveListDTO {
  constructor(obj) {
    this.code = obj.code;
    this.body = obj.body;
    this.state = obj.state;
    this.register_date = obj.register_date;
    this.final_date = obj.final_date || null;
    this.code_improvement = obj.code_improvement;
    this.code_type = obj.code_type;
    this.code_user_create = obj.code_user_create;
    this.code_user_completed = obj.code_user_completed || null;

    this.improvementPlan = obj.improvementPlan
      ? { code: obj.improvementPlan.code, title: obj.improvementPlan.title }
      : null;

    this.typeObjective = obj.typeObjective
      ? { code: obj.typeObjective.code, name: obj.typeObjective.name }
      : null;
  }
}

export default ObjectiveListDTO;
