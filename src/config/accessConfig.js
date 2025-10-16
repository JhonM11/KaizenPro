// src/config/accessConfig.js

export default {
  publicRoutes: [
    "/api/v1/kaizenpro/auth/login",
  ],

  privateRoutes: {
    //User
    "/api/v1/kaizenpro/user/createUser": ["admin"],  
    "/api/v1/kaizenpro/user/list": ["admin"],  
    "/api/v1/kaizenpro/user/delete/**": ["admin"],  
    "/api/v1/kaizenpro/user/state/**": ["admin"],  
    "/api/v1/kaizenpro/user/context": ["admin","lider","colaborador"],  
    //    
    "/api/v1/kaizenpro/type-objectives/createTypeObjective": ["admin"],  
    "/api/v1/kaizenpro/type-objectives/listAllTypeObjective": ["admin"],  
    "/api/v1/kaizenpro/type-objectives/updateNameTypeObjective": ["admin"], 
    // 
    "/api/v1/kaizenpro/timeframes/createTimeframe": ["admin"], 
    "/api/v1/kaizenpro/timeframes/listTimeframes": ["admin"], 
    "/api/v1/kaizenpro/timeframes/updateTimeframeName": ["admin"], 
    "/api/v1/kaizenpro/timeframes/updateTimeframeExtensionDate": ["admin"], 
    //
    "/api/v1/kaizenpro/improvementplan/createImprovementPlan": ["admin"], 
    "/api/v1/kaizenpro/improvementplan/listImprovementPlans": ["admin"],
    "/api/v1/kaizenpro/improvementplan/finalizeImprovementPlan/**": ["admin"], 
    //
    "/api/v1/kaizenpro/objectives/listObjectives": ["admin"], 
    "/api/v1/kaizenpro/objectives/createObjective": ["admin"], 
    "/api/v1/kaizenpro/objectives/finalize": ["admin"], 
    //
    "/api/v1/kaizenpro/actions/listActions": ["admin"], 
    "/api/v1/kaizenpro/actions/createAction": ["admin"], 
    "/api/v1/kaizenpro/actions/finalize": ["admin"], 
  }
};
