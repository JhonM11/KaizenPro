// src/config/accessConfig.js

export default {
  publicRoutes: [
    "/api/v1/kaizenpro/auth/login",
  ],

  privateRoutes: {
    "/api/v1/kaizenpro/user/createUser": ["admin"],  
  }
};
