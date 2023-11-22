import jwt from 'jsonwebtoken';
import logger from '../../utils/log/logger';
import { Response, NextFunction } from 'express';
import ExtendedRequestInterface from '../../interfaces/ExtendedRequestInterface';

const authMiddleware = (req: ExtendedRequestInterface, res: Response, next: NextFunction) => {
	let token = req.header('Authorization');
	if (token && token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	if (!token) {
		logger.error('Access denied. No token provided.');

		return res.status(401).json({ errorMessage: 'Access denied. No token provided.' });
	}

	try {
		const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET!.trim());
		req.user = decoded as { _id: string };
		next();
	} catch (ex) {
		logger.error('Invalid token.');
		res.status(400).json({ errorMessage: 'Invalid token.' });
	}
};

export default authMiddleware;
