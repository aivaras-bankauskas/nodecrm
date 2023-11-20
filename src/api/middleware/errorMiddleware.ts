import { Request, Response } from 'express';
import CustomError from '../../utils/errors/customErrors';

const errorMiddleware = (err: Error, _req: Request, res: Response) => {
	let statusCode = 500;
	let message = 'Something went wrong';

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
