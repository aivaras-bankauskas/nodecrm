import { Request, Response, NextFunction } from 'express';
import CustomError from '../../utils/errors/customError';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof CustomError) {

		return res.status(err.statusCode).json({ errorMessage: err.message });
	}

	return res.status(500).json({ errorMessage: 'Internal server Error' });
};

export default errorMiddleware;
