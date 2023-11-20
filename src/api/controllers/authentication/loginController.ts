import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import CustomError from '../../../utils/errors/customError';

const loginController = {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				throw new CustomError('Invalid email or password.', 401);
			}

			const validPassword = await bcrypt.compare(req.body.password, user.password);
			if (!validPassword) {
				throw new CustomError('Invalid email or password.', 401);
			}

			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
			res.json(
				{
					message: 'User logged in successfully.',
					data: user,
					token
				}
			);
		} catch (error) {
			next(error);
		}
	}
};

export default loginController;
