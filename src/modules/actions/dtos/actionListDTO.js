// src/modules/actions/dtos/actionListDTO.js
export const actionListDTO = (action) => ({
  code: action.code,
  title: action.title,
  description: action.description,
  state: action.state,
  register_date: action.register_date,
  final_date: action.final_date,
  code_improvement: action.code_improvement,
  code_objective: action.code_objective,
  code_user: action.code_user,
  code_user_completed: action.code_user_completed,
  objective: action.objective
    ? {
        code: action.objective.code,
        body: action.objective.body,
        state: action.objective.state,
      }
    : null,
});
