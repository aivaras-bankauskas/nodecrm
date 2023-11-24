import express from 'express';
import request from 'supertest';
import cors from 'cors';
import corsOptions from '../../src/config/corsOptions';

describe('CORS Policy Tests', () => {
	const app = express();
	app.use(cors(corsOptions));
	app.get('/test', (_req, res) => res.sendStatus(200));

	it('should reject requests from not allowed origins', async () => {
		const response = await request(app)
			.get('/test')
			.set('Origin', 'http://notallowedorigin.com');

		expect(response.status).toBe(403);
	});
});

