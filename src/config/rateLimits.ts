import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	message: 'Too many requests, please try again later'
});

export const loginLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 5,
	message: 'Too many login attempts, please try again later.'
});

export const registerLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 10,
	message: 'Too many registration attempts, please try again later.'
});
