import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    defaultMeta: {
        serviceName: "auth-service",
    },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize(),
    ),
    transports: [
        new winston.transports.File({
            dirname: "logs",
            filename: "combined.log",
            level: "info",
            // format: winston.format.timestamp(),
            // silent: Config.NODE_ENV === 'test',
        }),
        new winston.transports.File({
            dirname: "logs",
            filename: "error.log",
            level: "error",
            // silent: Config.NODE_ENV === 'test',
        }),

        new winston.transports.Console({
            level: "info",
        }),
    ],
});
export default logger;
