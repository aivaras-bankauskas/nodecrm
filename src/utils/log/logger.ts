import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
	level: 'info',
	format: combine(
		timestamp(),
		myFormat
	),
	transports: [
		new transports.Console({
			format: combine(
				colorize(),
				myFormat
			)
		}),
		new DailyRotateFile({
			filename: 'src/utils/log/logs/application-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d'
		})
	]
});

logger.exceptions.handle(
	new transports.File({ filename: 'src/utils/log/logs/exceptions.log' })
);

process.on('unhandledRejection', (ex) => {
	throw ex;
});

export default logger;
