import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Kaizenpro",
      version: "1.0.0",
      description: "Documentación de la API de Kaizenpro con Swagger 📚",
      contact: {
        name: "Teams de Desarrollo 👨‍💻:  John Fredy Morales & Nelson Ruiz Marimon",
        email: "jmoralesr4@unicartagena.edu.co" ,
        url: ""
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // 👈 Importante para que Swagger sepa que es un token
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
  "./src/modules/**/*.js",     // Rutas y controladores de los módulos
  "./src/config/auth/*.js"     // Auth (login)
],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
