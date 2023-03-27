"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./utils/logger");
// import {} from "@utils/"
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    logger_1.logger.info(`multi-school node server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
