import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, validate } from '../../models/user';

const registrationController = {
	async register(req: Request, res: Response) {
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).json({ message: 'User already registered.' });
		}

		user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		});

		await user.save();

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
		res.header('Authorization', token).json({ message: 'User registered successfully.' });
	}
};

export default registrationController;
