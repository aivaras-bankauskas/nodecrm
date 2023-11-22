import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import logger from '../../../utils/log/logger';
import CustomError from '../../../utils/errors/CustomError';

const loginController = {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				logger.error('User not found.');
				throw new CustomError('Invalid email or password.', 401);
			}

			const validPassword = await bcrypt.compare(req.body.password, user.password);
			if (!validPassword) {
				logger.error('Invalid password.');
				throw new CustomError('Invalid email or password.', 401);
			}

			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

			logger.info(`User logged in successfully: ${req.body.email}`);

			const userResponse = await User.findById(user._id).select('-password');
			res.json(
				{
					message: 'User logged in successfully.',
					data: userResponse,
					token
				}
			);
		} catch (error) {
			next(error);
		}
	}
};

export default loginController;
