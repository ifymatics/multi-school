import { School } from "./../models/school.model";
import { NextFunction, Request, Response } from "express";
import { InternalServerError } from "./../errors/internal-server-error"
import { logger } from "./../utils/logger";

export class AdminController {

    static async postSchoolReg(req: Request, res: Response, next: NextFunction) {

        const { name, address, email, contactPerson, phone, regNo } = req.body;
        const school = new School({ email, contactPerson, address, name, phone, regNo });
        if (!(name && address && email && email && contactPerson && regNo)) return res.status(400).json("All fields are required!")
        try {
            const newSchool = await school.save();
            res.status(201).json(newSchool)
        } catch (error) {
            logger.error(`Error occured while creating school. Error:${JSON.stringify(error)}`);
            next(new InternalServerError("Error occured while submitting your request"));



        }

    }
    static async getSchoolReg(req: Request, res: Response) {
        const schools = await School.find({});
        res.status(200).json(schools)
    }
    static async getSchoolById(req: Request, res: Response) {
        const id = req.params.id;
        const school = await School.findOne({ _id: id });
        if (!school) return res.status(404).json("School not found!")
        res.status(200).json(school)
    }
    static async approveSchool(req: Request, res: Response) {
        const id = req.params.id;
        const school = await School.findOne({ _id: id });
        if (!school) return res.status(404).json("School not found!")
        //Todos:
        //1. generate login password
        //2. update school with generated password and change status to 'approved'
        //3. send the generated password to school using their email
        res.status(200).json(school)
    }
}