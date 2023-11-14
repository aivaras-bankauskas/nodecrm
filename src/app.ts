import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/database';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

export default app;
