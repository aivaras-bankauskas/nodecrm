import { Request, Response } from 'express';
import { User } from '../models/user';

const userController = {

	index: async (req: Request, res: Response) => {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(400).json({ message: 'An unknown error occurred' });
			}
		}
	},

	store: async (req: Request, res: Response) => {
		try {
			const user = new User(req.body);
			await user.save();
			res.status(201).json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(400).json({ message: 'An unknown error occurred' });
			}
		}
	},

	show: async (req: Request, res: Response) => {
		try {
			const user = await User.findById(req.params.id);
			res.status(200).json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(400).json({ message: 'An unknown error occurred' });
			}
		}
	},

	update: async (req: Request, res: Response) => {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'An unknown error occurred' });
			}
		}
	},

	destroy: async (req: Request, res: Response) => {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(user);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'An unknown error occurred' });
			}
		}
	}
};

export default userController;
