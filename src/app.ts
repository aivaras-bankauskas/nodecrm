import dotenv from 'dotenv';
import express from 'express';
import { globalLimiter } from './config/rateLimits';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './config/logger';
import connectDB from './config/database';
import apiRoutes from './api/routes/api';
import errorMiddleware from './api/middleware/errorMiddleware';
import { swaggerSpec, swaggerUi } from './config/swagger';

dotenv.config();
const app = express();

connectDB();

app.use(helmet());

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(globalLimiter);

app.use(express.json());

app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } }));

app.use('/api', apiRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

export default app;
