import mongoose from 'mongoose';
import logger from './logger';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI as string);
		logger.info(`MongoDB Connected to: ${connect.connection.host}`);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		logger.error(`Error: ${errorMessage}.`);
		process.exit(1);
	}
};

export default connectDB;
