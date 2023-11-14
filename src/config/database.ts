import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI as string);
		console.log(`MongoDB Connected: ${connect.connection.host}`);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
		} else {
			console.error('An unknown error occurred');
		}
		process.exit(1);
	}
};

export default connectDB;
