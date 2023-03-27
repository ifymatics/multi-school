"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const winston_1 = require("winston");
const logDir = 'logs';
// Create the log directory if it does not exist
if (!(0, fs_1.existsSync)(logDir)) {
    (0, fs_1.mkdirSync)(logDir);
}
const errorLog = (0, path_1.join)(logDir, 'error.log');
const requestLog = (0, path_1.join)(logDir, 'request.log');
const combinedLog = (0, path_1.join)(logDir, 'combined.log');
const exceptionsLog = (0, path_1.join)(logDir, 'exceptions.log');
const isRequest = (0, winston_1.format)((info, opts) => {
    if (info.isRequest) {
        return info;
    }
    return false;
});
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.transports.File({
            filename: errorLog,
            level: 'error'
        }),
        new winston_1.transports.File({
            filename: requestLog,
            format: winston_1.format.combine(isRequest())
        }),
        new winston_1.transports.File({
            filename: combinedLog
        })
    ],
    exceptionHandlers: [
        new winston_1.transports.File({
            filename: exceptionsLog
        })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
        level: 'debug'
    }));
}
