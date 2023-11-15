import mongoose from 'mongoose';
import Joi from 'joi';
import UserInterface from '../../interfaces/UserInterface';

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

export const User = mongoose.model('User', userSchema);

const validateUserSchema = Joi.object({
	firstName: Joi.string().required().min(2),
	lastName: Joi.string().required().min(2),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(6)
});

export const validate = (user: UserInterface) => {
	return validateUserSchema.validate(user);
};
