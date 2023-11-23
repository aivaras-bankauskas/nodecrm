describe('logger', () => {
	it('should handle unhandledRejection events', () => {
		const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
			throw new Error('process.exit() was called.');
		});

		const mockProcessOn = jest.spyOn(process, 'on').mockImplementation((event, handler) => {
			if (event === 'unhandledRejection') {
				handler(new Error('unhandled rejection'));
			}

			return process;
		});

		expect(() => {
			require('../../src/config/logger');
		}).toThrow('unhandled rejection');

		expect(mockProcessOn).toHaveBeenCalledWith('unhandledRejection', expect.any(Function));

		mockProcessOn.mockRestore();
		mockExit.mockRestore();
	});
});
