import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../../interfaces/extendedRequest';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: ExtendedRequest, res: Response, next: NextFunction) => {
	let token = req.header('Authorization');
	if (token && token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	if (!token) {
		return res.status(401).json({ message: 'Access denied. No token provided.' });
	}

	try {
		const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET!.trim());
		req.user = decoded as { _id: string };
		next();
	} catch (ex) {
		res.status(400).json({ message: 'Invalid token.' });
	}
};

export default authMiddleware;
