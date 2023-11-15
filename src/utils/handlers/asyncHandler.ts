import { Request, Response } from 'express';

type AsyncHandler = (_req: Request, _res: Response) => Promise<void>;

const handleRequest = (handler: AsyncHandler) => async (req: Request, res: Response) => {
	try {
		await handler(req, res);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};

export default handleRequest;
