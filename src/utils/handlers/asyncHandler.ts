import { Request, Response } from 'express';

type AsyncHandler<T> = (_req: Request, _res: Response) => Promise<T>;

const handleRequest = <T>(handler: AsyncHandler<T>) => async (req: Request, res: Response) => {
	try {
		await handler(req, res);
	} catch (error) {
		if (!res.headersSent) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'An unknown error occurred' });
			}
		}
	}
};

export default handleRequest;
