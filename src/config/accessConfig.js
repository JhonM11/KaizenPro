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
  }
};
