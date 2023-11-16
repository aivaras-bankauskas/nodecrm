import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import UserInterface from '../../interfaces/UserInterface';

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		return next();
	}
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		if (error instanceof Error) {
			next(error);
		}
	}
});

export const User = mongoose.model<UserInterface>('User', userSchema);

const validateUserSchema = Joi.object({
	firstName: Joi.string().required().min(2),
	lastName: Joi.string().required().min(2),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(6)
});

export const validate = (user: UserInterface) => {
	return validateUserSchema.validate(user);
};
