import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../../src/app';
import User from '../../../../src/api/models/user';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('loginController', () => {
	let mongoServer: MongoMemoryServer;

	beforeAll(async () => {
		if (mongoose.connection.readyState !== 0) {
			await mongoose.disconnect();
		}

		mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri());

		const user = new User({
			firstName: 'Test',
			lastName: 'User',
			email: 'test@example.com',
			password: 'password123'
		});
		await user.save();
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoServer.stop();
	});

	it('should log in a user successfully', async () => {
		const res = await request(app)
			.post('/api/login')
			.send({
				email: 'test@example.com',
				password: 'password123'
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('token');
	});

	it('should fail login with invalid email', async () => {
		const res = await request(app)
			.post('/api/login')
			.send({
				email: 'nonexistent@example.com',
				password: 'password123'
			});

		expect(res.statusCode).toEqual(401);
	});

	it('should fail login with incorrect password', async () => {
		const res = await request(app)
			.post('/api/login')
			.send({
				email: 'test@example.com',
				password: 'wrongpassword'
			});

		expect(res.statusCode).toEqual(401);
	});
});
