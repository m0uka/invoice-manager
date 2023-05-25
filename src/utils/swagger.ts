import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import fs from 'fs';

const options: swaggerJsDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Invoice Manager API docs',
			version: '1.0.0'
		},
		components: {
			securitySchemas: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT"
				}
			}
		}
	},
	apis: ['./src/controllers/*.ts']
};

const swaggerSpec = swaggerJsDoc(options);
fs.writeFileSync('openapi.json', JSON.stringify(swaggerSpec, null, 4));

export function useSwaggerDocs(app: Express) {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}