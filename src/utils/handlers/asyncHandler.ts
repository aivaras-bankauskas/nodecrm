import { Request, Response, NextFunction } from 'express';

type AsyncHandler<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

const asyncHandler = <T>(handler: AsyncHandler<T>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};

export default asyncHandler;
