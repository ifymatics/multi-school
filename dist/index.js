"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app_1 = __importDefault(require("./app"));
const db_1 = require("./configs/db");
const logger_1 = require("./utils/logger");
(async () => {
    if (!process.env.JWT_KEY) {
        logger_1.logger.error('JWT_KEY must be defined');
        throw new Error('JWT_KEY must be defined');
    }
    try {
        await (0, db_1.dBconnect)();
        const PORT = process.env.PORT || 5000;
        app_1.default.listen(PORT, () => {
            logger_1.logger.info(`multi-school node server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
        });
    }
    catch (error) {
    }
})();
