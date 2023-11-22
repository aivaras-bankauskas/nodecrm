import mongoose from 'mongoose';
import logger from '../../src/utils/log/logger';
import connectDB from '../../src/config/database';

jest.mock('mongoose', () => ({
	connect: jest.fn()
}));

jest.mock('../../src/utils/log/logger', () => ({
	info: jest.fn(),
	error: jest.fn()
}));

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
	throw new Error('process.exit() was called.');
});

describe('connectDB', () => {
	it('should handle connection errors', async () => {
		const error = new Error('Connection error');
		(mongoose.connect as jest.Mock).mockRejectedValue(error);

		await expect(connectDB()).rejects.toThrow('process.exit() was called.');

		expect(logger.error).toHaveBeenCalledWith(`Error: ${error.message}`);
		expect(mockExit).toHaveBeenCalledWith(1);
	});
	it('should handle unknown errors', async () => {
		const error = 'Unknown error';
		(mongoose.connect as jest.Mock).mockRejectedValue(error);

		await expect(connectDB()).rejects.toThrow('process.exit() was called.');

		expect(logger.error).toHaveBeenCalledWith('Error: An unknown error occurred');
		expect(mockExit).toHaveBeenCalledWith(1);
	});
});
