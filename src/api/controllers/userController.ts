import bcrypt from 'bcrypt';
import User from '../models/user';
import logger from '../../utils/log/logger';
import userValidation from '../validation/userValidation';
import asyncHandler from '../../utils/handlers/asyncHandler';
import CustomError from '../../utils/errors/CustomError';
import checkIfEmailUnique from '../../utils/helpers/checkIfEmailUniqueHelper';

const userController = {

	index: asyncHandler(async (_req, res) => {
		const users = await User.find().select('-password');
		logger.info('Users retrieved successfully.');
		res.status(200).json({ data: users });
	}),

	show: asyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) {
			logger.error(`User not found: ${req.params.id}`);
			throw new CustomError('User not found', 404);
		}
		logger.info(`User retrieved successfully: ${req.params.id}`);
		res.status(200).json({ data: user });
	}),

	update: asyncHandler(async (req, res) => {
		const currentUserId = req.params.id;

		const { error } = userValidation(req.body);
		if (error) {
			logger.error(`Error: ${error.details[0].message}`);
			throw new CustomError(error.details[0].message, 400);
		}

		if (req.body.email) {
			const existingUser = await User.findById(currentUserId);
			if (!existingUser) {
				logger.error(`User not found: ${req.params.id}`);
				throw new CustomError('User not found', 404);
			}
			if (req.body.email !== existingUser.email) {
				await checkIfEmailUnique(User, req.body.email, existingUser._id.toString());
			}
		}

		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}

		const user = await User.findByIdAndUpdate(currentUserId, req.body, { new: true });
		if (!user) {
			logger.error(`User not found: ${req.params.id}`);
			throw new CustomError('User not found', 404);
		}
		logger.info(`User updated successfully: ${req.params.id}`);

		const userResponse = await User.findById(user._id).select('-password');
		res.json(
			{
				message: 'User updated successfully.',
				data: userResponse
			}
		);
	}),

	destroy: asyncHandler(async (req, res) => {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			logger.error(`User not found: ${req.params.id}`);
			throw new CustomError('User not found', 404);
		}
		logger.info(`User deleted successfully: ${req.params.id}`);

		const responseData = {
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		};

		res.json({
			message: 'User deleted successfully.',
			data: responseData
		});
	})
};

export default userController;
