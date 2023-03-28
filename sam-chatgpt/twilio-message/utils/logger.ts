import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

const logger = () => {
    return winston.createLogger({
        level: 'info',
        // format: winston.format.json(),
        defaultMeta: { service: 'pdf-service', method: 'drawFooter' },
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                    }),
                    winston.format.printf((info) => `${info.timestamp} ${info.level} ${uuidv4()} ${info.message}`),
                ),
            }),
        ],
    });
};

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};
export { logger, getErrorMessage };
