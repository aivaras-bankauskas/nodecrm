import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import logger from './config/logger';
import connectDB from './config/database';
import corsOptions from './config/corsOptions';
import apiRoutes from './api/routes/api';
import errorMiddleware from './api/middleware/errorMiddleware';
import { swaggerSpec, swaggerUi } from './config/swagger';
import { globalLimiter } from './config/rateLimits';

const app = express();

connectDB();

app.use(helmet());

app.use(cors(corsOptions));

app.use(express.json());

app.use(globalLimiter);

app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } }));

app.use('/api', apiRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

export default app;
