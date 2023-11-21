import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../src/api/models/user';
import UserInterface from '../../../src/interfaces/UserInterface';
import jwt from 'jsonwebtoken';

describe('userController', () => {
	let mongoServer: MongoMemoryServer;
	let testUser: UserInterface;
	let token: string;

	beforeAll(async () => {
		if (mongoose.connection.readyState !== 0) {
			await mongoose.disconnect();
		}

		mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri());

		testUser = await User.create({
			firstName: 'Test',
			lastName: 'User',
			email: 'test@example.com',
			password: 'test1234'
		});

		token = jwt.sign({ _id: testUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoServer.stop();
	});

	it('should retrieve all users', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('Authorization', `Bearer ${token}`);

		expect(res.statusCode).toEqual(200);
		expect(Array.isArray(res.body.data)).toBeTruthy();
	});

	it('should retrieve a single user', async () => {
		if (!testUser || !testUser._id) {
			throw new Error('Test user not properly initialized');
		}
		const res = await request(app)
			.get(`/api/users/${testUser._id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('data');
		expect(res.body.data).toHaveProperty('_id', testUser._id.toString());
	});

	it('should return 404 for a non-existent user in show', async () => {
		const nonExistentId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.get(`/api/users/${nonExistentId}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.statusCode).toEqual(404);
	});

	it('should successfully update a user', async () => {
		const res = await request(app)
			.put(`/api/users/${testUser._id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				firstName: 'UpdatedTest',
				lastName: 'UpdatedUser',
				email: 'updatedtestuser@example.com',
				password: 'updated1234'
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('message', 'User updated successfully.');
		expect(res.body.data).toHaveProperty('firstName', 'UpdatedTest');
	});

	it('should return 400 for invalid data in update', async () => {
		const res = await request(app)
			.put(`/api/users/${testUser._id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				email: 'invalid-email'
			});

		expect(res.statusCode).toEqual(400);
	});

	it('should return 404 for updating a non-existent user', async () => {
		const nonExistentId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.put(`/api/users/${nonExistentId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				password: 'test1234'
			});

		expect(res.statusCode).toEqual(404);
	});

	it('should successfully delete a user', async () => {
		const userToDelete = await User.create({
			firstName: 'Delete',
			lastName: 'Me',
			email: 'delete@example.com',
			password: 'test1234'
		});

		const res = await request(app)
			.delete(`/api/users/${userToDelete._id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('message', 'User deleted successfully.');
	});

	it('should return 404 for deleting a non-existent user', async () => {
		const nonExistentId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.delete(`/api/users/${nonExistentId}`)
			.set('Authorization', `Bearer ${token}`);

		expect(res.statusCode).toEqual(404);
	});
});
