import { Request, Response } from 'express';
import errorMiddleware from '../../../src/api/middleware/errorMiddleware';

const mockResponse = (): Response => {
	const res = {} as Response;
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);

	return res;
};

const mockNext = jest.fn();

describe('errorMiddleware', () => {
	it('should handle server Error', () => {
		const err = new Error('Generic error');
		const res = mockResponse();

		errorMiddleware(err, {} as Request, res, mockNext);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ errorMessage: 'Internal server Error' });
	});
});
