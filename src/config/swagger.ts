import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import env from '@/config/environment.js';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gym SaaS API',
      version: '1.0.0',
      description: 'API documentation for the Gym SaaS application.',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your Bearer token in the format: Bearer <token>',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Document all routes under src/module and specific general routes
  apis: [
    './src/shared/factories/express.app.factory.ts',
    './src/module/**/interfaces/*.routes.ts',
    './src/module/**/interfaces/route/*.routes.ts',
    './src/module/permissions/permission.routes.ts',
  ],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export default swaggerSpecs;
