import mongoose from 'mongoose';
import logger from '../utils/log/logger';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI as string);
		logger.info(`MongoDB Connected to: ${connect.connection.host}`);
	} catch (error) {
		if (error instanceof Error) {
			logger.error(`Error: ${error.message}`);
		} else {
			logger.error('An unknown error occurred');
		}
		process.exit(1);
	}
};

export default connectDB;
