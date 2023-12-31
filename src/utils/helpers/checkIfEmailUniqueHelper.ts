import { Model } from 'mongoose';
import CustomError from '../errors/CustomError';
import UserInterface from '../../interfaces/UserInterface';

const checkIfEmailUnique = async (
	model: Model<UserInterface>,
	email: string,
	currentUserId: string | null = null
): Promise<void> => {
	const query: { email: string; _id?: object } = { email };

	if (currentUserId) {
		query._id = { $ne: currentUserId };
	}

	const existingUser = await model.findOne(query);
	if (existingUser) {
		throw new CustomError('Email already taken', 400);
	}
};

export default checkIfEmailUnique;
