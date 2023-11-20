import handleRequest from '../../../utils/handlers/asyncHandler';
import { checkIfEmailUnique } from '../../../utils/helpers/databaseHelpers';
import { User, validate } from '../../models/user';
import jwt from 'jsonwebtoken';

const registrationController = {
	register: handleRequest(async (req, res) => {
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		await checkIfEmailUnique(User, req.body.email);

		const user = new User(req.body);

		await user.save();

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

		res.header('Authorization', token).json(
			{
				message: 'User registered successfully.',
				data: user,
				token
			}
		);
	})
};

export default registrationController;
