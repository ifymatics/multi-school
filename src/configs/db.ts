// import { config } from "dotenv";
// config({ path: "./../.env" })
import { logger } from './../utils/logger';
import { connect, connection } from 'mongoose';

const url = process.env.MONGO_URI || ''

export const dBconnect = async () => {
    let dBconnection;
    try {
        dBconnection = await connect(url);
    } catch (error) {
        connection.close();
        //console.log(JSON.stringify(error));
        logger.error(`Error occured while connecting to database with:${JSON.stringify(error)}`);
        return "DB connection failed!"
    }
    return dBconnection;
}