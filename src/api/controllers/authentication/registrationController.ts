import jwt from 'jsonwebtoken';
import User from '../../models/user';
import logger from '../../../utils/log/logger';
import CustomError from '../../../utils/errors/CustomError';
import userValidation from '../../validation/userValidation';
import asyncHandler from '../../../utils/handlers/asyncHandler';
import checkIfEmailUnique from '../../../utils/helpers/checkIfEmailUniqueHelper';

const registrationController = {
	register: asyncHandler(async (req, res) => {
		const { error } = userValidation(req.body);
		if (error) {
			logger.error(`Error: ${error.details[0].message}.`);
			throw new CustomError(error.details[0].message, 400);
		}

		await checkIfEmailUnique(User, req.body.email);

		const user = new User(req.body);

		await user.save();

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

		logger.info(`User registered successfully: ${user.email}`);

		const userResponse = await User.findById(user._id).select('-password');
		res.header('Authorization', token).json(
			{
				message: 'User registered successfully.',
				data: userResponse,
				token
			}
		);
	})
};

export default registrationController;
