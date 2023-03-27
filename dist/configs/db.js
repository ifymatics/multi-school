"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dBconnect = void 0;
const mongoose_1 = require("mongoose");
const url = process.env.MONGO_URL || '';
const dBconnect = async () => {
    let dBconnection;
    try {
        dBconnection = await (0, mongoose_1.connect)(url);
    }
    catch (error) {
        mongoose_1.connection.close();
        console.log(JSON.stringify(error));
        return "DB connection failed!";
    }
    return dBconnection;
};
exports.dBconnect = dBconnect;
