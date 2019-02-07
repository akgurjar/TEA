import { createLogger, transports, format } from 'winston';

export const DbLoagger = createLogger({
    level: 'info',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({
                    level: true,
                    message: true
                }),
                format.printf((info) => {
                    return `[${info.level}] ${info.message}`;
                }),
            )
        }),
        new transports.File({filename: 'database.log'})
    ]
});

export const Console = createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({
                    level: true,
                    message: true
                }),
                format.printf((info) => {
                    return `[${info.level}] ${info.message}`;
                }),
            )
        })
    ]
})