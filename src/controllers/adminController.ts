
import { School } from "./../models";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "./../errors/bad-request-error";
import { NotFoundError } from "./../errors/not-found-error";
import { InternalServerError } from "./../errors/internal-server-error";
import { logger } from "./../utils/logger";
import { generatePassword } from "./../utils/password-generator";
import { sendEmail } from "./../utils/email-sender";
import { cache } from "./../utils/cache";
//import { cache } from "./../utils/redis-cache";

export class AdminController {

    static async postSchoolReg(req: Request, res: Response, next: NextFunction) {
        const { name, address, email, contactPerson, phone, regNo } = req.body;

        // Validate input
        if (!(name && address && email && contactPerson && regNo)) {
            return next(new BadRequestError("All fields are required!"));
        }

        try {
            const school = new School({ email, contactPerson, address, name, phone, regNo });
            const newSchool = await school.save();

            // Invalidate cache for school list
            cache.del("schoolList");

            res.status(201).json(newSchool);
        } catch (error) {
            logger.error(`Error occurred while creating school. Error:${JSON.stringify(error)}`);
            next(new InternalServerError("Error occurred while submitting your request"));
        }
    }

    static async getSchoolReg(req: Request, res: Response, next: NextFunction) {
        try {
            // Check cache for school list
            const cachedSchoolList = await cache.get("schoolList");
            if (cachedSchoolList) {

                return res.status(200).json(cachedSchoolList);
            }

            // Fetch school list from database and store in cache
            const schools = await School.find({});
            cache.set("schoolList", schools);

            res.status(200).json(schools);
        } catch (error) {
            logger.error(`Error occurred while fetching school list. Error:${JSON.stringify(error)}`);
            next(new InternalServerError("Error occurred while submitting your request"));
        }
    }

    static async getSchoolById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        try {
            const school = await School.findOne({ _id: id });
            if (!school) {
                return next(new NotFoundError("School not found!"));
            }

            res.status(200).json(school);
        } catch (error) {
            logger.error(`Error occurred while fetching school by id. Error:${JSON.stringify(error)}`);
            next(new InternalServerError("Error occurred while submitting your request"));
        }
    }

    static async approveSchool(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        try {
            const school = await School.findOne({ _id: id });
            if (!school) {
                return next(new NotFoundError("School not found!"));
            }

            // Generate login password
            const password = generatePassword();

            // Update school with generated password and change status to 'approved'
            school.status = "approved";
            school.password = password;
            await school.save();

            // Send the generated password to school using their email
            sendEmail(school.email, "Your login password", `Your login password is: ${password}`);

            res.status(200).json(school);
        } catch (error) {
            logger.error(`Error occurred while approving school. Error:${JSON.stringify(error)}`);
            next(new InternalServerError("Error occurred while submitting your request"));
        }
    }
}