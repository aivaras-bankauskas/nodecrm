import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import logger from './utils/log/logger';
import connectDB from './config/database';
import apiRoutes from './api/routes/api';
import errorMiddleware from './api/middleware/errorMiddleware';
import { swaggerSpec, swaggerUi } from './utils/docs/swagger';

dotenv.config();
const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } }));

app.use('/api', apiRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

export default app;
