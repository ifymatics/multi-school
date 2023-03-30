import { config } from "dotenv";
config();
import app from "./app";
import { dBconnect } from "./configs/db";

import { logger } from "./utils/logger";


(async () => {

    if (!process.env.JWT_KEY) {
        logger.error('JWT_KEY must be defined')
        throw new Error('JWT_KEY must be defined');
    }
    try {
        await dBconnect();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {

            logger.info(`multi-school node server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
        })
    } catch (error) {

    }

})()

