import { Request, Response, NextFunction } from 'express';
import CustomError from '../../utils/errors/CustomError';
import logger from '../../config/logger';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof CustomError) {
		logger.error(`Error: ${err.message}.`);

		return res.status(err.statusCode).json({ errorMessage: err.message });
	}
	logger.error(`Error: ${err.message}.`);

	return res.status(500).json({ errorMessage: 'Internal server Error' });
};

export default errorMiddleware;
