import mongoose from 'mongoose';
import connectDB from '../../src/config/database';

jest.mock('mongoose', () => ({
	connect: jest.fn()
}));

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
	throw new Error('process.exit() was called.');
});

describe('connectDB', () => {
	it('should handle connection errors', async () => {
		const error = new Error('Connection error');
		(mongoose.connect as jest.Mock).mockRejectedValue(error);

		await expect(connectDB()).rejects.toThrow('process.exit() was called.');

		expect(mockExit).toHaveBeenCalledWith(1);
	});
	it('should handle unknown errors', async () => {
		const error = 'Error: An unknown error occurred';
		(mongoose.connect as jest.Mock).mockRejectedValue(error);

		await expect(connectDB()).rejects.toThrow('process.exit() was called.');
		expect(mockExit).toHaveBeenCalledWith(1);
	});
});
