import jwt from 'jsonwebtoken';
import { Response } from 'express';
import authMiddleware from '../../../src/api/middleware/authMiddleware';
import ExtendedRequestInterface from '../../../src/interfaces/ExtendedRequestInterface';

jest.mock('../../../src/utils/log/logger', () => ({
	error: jest.fn()
}));

const mockRequest = (): ExtendedRequestInterface => {
	const req = {} as ExtendedRequestInterface;
	req.header = jest.fn().mockReturnValue(`Bearer ${jwt.sign({ _id: '123' }, process.env.JWT_SECRET!)}`);
	req.user = undefined;

	return req;
};

const mockResponse = (): Response => {
	const res = {} as Response;
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);

	return res;
};

const mockNext = jest.fn();

beforeAll(() => {
	process.env.JWT_SECRET = 'your-secret-key';
});

describe('authMiddleware', () => {
	it('should return 401 when no token is provided', () => {
		const req = mockRequest();
		req.header = jest.fn().mockReturnValue('');
		const res = mockResponse();

		authMiddleware(req, res, mockNext);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ message: 'Access denied. No token provided.' });
	});

	it('should return 400 when an invalid token is provided', () => {
		const req = mockRequest();
		req.header = jest.fn().mockReturnValue('Bearer invalid_token');
		const res = mockResponse();

		authMiddleware(req, res, mockNext);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token.' });
	});
});
