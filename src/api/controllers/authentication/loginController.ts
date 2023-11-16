import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../models/user';

const loginController = {
	async login(req: Request, res: Response) {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password.' });
		}

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) {
			return res.status(401).json({ message: 'Invalid email or password.' });
		}

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
		res.json({ token });
	}
};

export default loginController;
