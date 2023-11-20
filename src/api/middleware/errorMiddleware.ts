import { Request, Response } from 'express';
import CustomError from '../../utils/errors/customError';

const errorMiddleware = (err: Error, _req: Request, res: Response) => {
	let statusCode = 500;
	let message = 'Internal Server Error';

	if (err instanceof CustomError) {
		statusCode = err.statusCode;
		message = err.message;
	}

	res.status(statusCode).json({
		status: 'error',
		message
	});
};

export default errorMiddleware;
