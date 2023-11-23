import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Node CRM API Documentation',
		version: '1.0.0',
		description: 'This is a REST API documentation for the Node CRM project.'
	},
	host: 'localhost:3000',
	basePath: '/'
};

const options = {
	swaggerDefinition,
	apis: ['./src/utils/swagger/*.yaml']
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
