import { CorsOptions } from 'cors';
import CustomError from '../utils/errors/CustomError';

const allowedOrigins: string[] = [process.env.CORS_ORIGIN!, process.env.SWAGGER_HOST!];

const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new CustomError('Not allowed.', 403));
		}
	},
	optionsSuccessStatus: 200
};

export default corsOptions;
