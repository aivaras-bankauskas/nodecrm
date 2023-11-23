import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (handler: AsyncHandler) =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			await handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};

export default asyncHandler;
