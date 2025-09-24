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
                // Usa RENDER_EXTERNAL_URL para producción o localhost para desarrollo
                url: process.env.RENDER_EXTERNAL_URL || "http://localhost:3000",
                description: "Servidor de producción o desarrollo",
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
    tags: [
      {
        name: "Auth",
        description: "Endpoints de autenticación y login",
      },
      {
        name: "Users",
        description: "Gestión de usuarios",
      },
      {
        name: "TypeObjectives",
        description: "API para gestionar los tipos de objetivos",
      },
      {
        name: "Timeframes",
        description: "API para gestionar los periodos de tiempo",
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
