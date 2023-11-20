import Joi from 'joi';
import UserInterface from '../../interfaces/UserInterface';

const validateUserSchema = Joi.object({
	firstName: Joi.string().required().min(2),
	lastName: Joi.string().required().min(2),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).pattern(new RegExp('(?=.*[A-Za-z])(?=.*[0-9])')).required()
		.messages({
			'string.min': 'Password must be at least 6 characters long.',
			'string.pattern.base': 'Password must include at least one letter and one number.'
		})
});

const userValidation = (user: UserInterface) => {
	return validateUserSchema.validate(user, { abortEarly: false });
};

export default userValidation;
