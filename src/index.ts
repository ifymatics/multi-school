import app from "./app";
import { logger } from "./utils/logger";
// import {} from "@utils/"

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    logger.info(`multi-school node server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
})
