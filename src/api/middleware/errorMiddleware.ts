import { Request, Response } from 'express';
import CustomError from '../../utils/errors/customError';

const errorMiddleware = (err: Error, _req: Request, res: Response) => {
	if (err instanceof CustomError) {

		return res.status(err.statusCode).json({ message: err.message });
	}

	return res.status(500).json({ message: 'Internal server Error' });
};

export default errorMiddleware;
