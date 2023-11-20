import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/database';
import apiRoutes from './api/routes/api';
import errorMiddleware from './api/middleware/errorMiddleware';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api', apiRoutes);

app.use(errorMiddleware);

export default app;
