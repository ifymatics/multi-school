import { logger } from './../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from './../errors/custorm-error';


export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (error instanceof CustomError) {
        logger.error("loggedErr:" + JSON.stringify(error))

        return res.status(error.statusCode).send({ errors: error.serializeError() })
    }
    logger.error(JSON.stringify(error))
    logger.error("loggedErr:" + JSON.stringify(error))
    //req.error = error.message;
    res.status(400).send({ message: error.message });

}