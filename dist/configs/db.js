"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dBconnect = void 0;
// import { config } from "dotenv";
// config({ path: "./../.env" })
const logger_1 = require("./../utils/logger");
const mongoose_1 = require("mongoose");
const url = process.env.MONGO_URI || '';
const dBconnect = async () => {
    let dBconnection;
    try {
        dBconnection = await (0, mongoose_1.connect)(url);
    }
    catch (error) {
        mongoose_1.connection.close();
        //console.log(JSON.stringify(error));
        logger_1.logger.error(`Error occured while connecting to database with:${JSON.stringify(error)}`);
        return "DB connection failed!";
    }
    return dBconnection;
};
exports.dBconnect = dBconnect;
