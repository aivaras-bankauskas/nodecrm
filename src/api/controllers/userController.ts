import handleRequest from '../../utils/handlers/asyncHandler';
import { checkIfEmailUnique } from '../../utils/helpers/databaseHelpers';
import { User, validate } from '../models/user';

const userController = {

	index: handleRequest(async (_req, res) => {
		const users = await User.find();
		res.status(200).json(users);
	}),

	store: handleRequest(async (req, res) => {
		const { error } = validate(req.body);
		if (error) {
			throw new Error(error.details[0].message);
		}
		await checkIfEmailUnique(User, req.body.email);

		const user = new User(req.body);
		await user.save();
		res.status(201).json(user);
	}),

	show: handleRequest(async (req, res) => {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).json({ message: 'User not found' });

			return;
		}
		res.status(200).json(user);
	}),

	update: handleRequest(async (req, res) => {
		const currentUserId = req.params.id;

		const { error } = validate(req.body);
		if (error) {
			throw new Error(error.details[0].message);
		}

		if (req.body.email) {
			const existingUser = await User.findById(currentUserId);
			if (!existingUser) {
				res.status(404).json({ message: 'User not found' });

				return;
			}
			if (req.body.email !== existingUser.email) {
				await checkIfEmailUnique(User, req.body.email, existingUser._id.toString());
			}
		}

		const user = await User.findByIdAndUpdate(currentUserId, req.body, { new: true });
		if (!user) {
			res.status(404).json({ message: 'User not found' });

			return;
		}
		res.json(user);
	}),

	destroy: handleRequest(async (req, res) => {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			res.status(404).json({ message: 'User not found' });

			return;
		}
		res.json(user);
	})
};

export default userController;
