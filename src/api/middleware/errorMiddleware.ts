import { Request, Response, NextFunction } from 'express';
import CustomError from '../../utils/errors/CustomError';
import logger from '../../config/logger';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
	if (err instanceof CustomError) {
		logger.error(`Error: ${err.message}.`);

		res.status(err.statusCode).json({ errorMessage: err.message });

		return;
	}
	logger.error(`Error: ${err.message}.`);

	res.status(500).json({ errorMessage: 'Internal server Error' });

	return;
};

export default errorMiddleware;
