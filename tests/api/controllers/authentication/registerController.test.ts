import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('User Registration', () => {
	let mongoServer: MongoMemoryServer;

	beforeAll(async () => {
		if (mongoose.connection.readyState !== 0) {
			await mongoose.disconnect();
		}

		mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoServer.stop();
	});

	it('should register a new user', async () => {
		const res = await request(app)
			.post('/api/register')
			.send({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				password: 'test1234'
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('token');
	});

	it('should fail registration with invalid email', async () => {
		const res = await request(app)
			.post('/api/register')
			.send({
				firstName: 'Jane',
				lastName: 'Doe',
				email: 'not-an-email',
				password: 'test1234'
			});

		expect(res.statusCode).toEqual(400);
	});

	it('should fail registration with existing email', async () => {
		await request(app)
			.post('/api/register')
			.send({
				firstName: 'Jane',
				lastName: 'Doe',
				email: 'jane@example.com',
				password: 'test1234'
			});

		const res = await request(app)
			.post('/api/register')
			.send({
				firstName: 'Jane',
				lastName: 'Doe',
				email: 'jane@example.com',
				password: 'test1234'
			});

		expect(res.statusCode).toEqual(400);
	});
});
