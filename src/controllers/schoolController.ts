import { NextFunction, Request, Response } from "express";
import { School, AcademicYear, AcademicClass } from "./../models";
import { BadRequestError, InternalServerError, NotFoundError } from "./../errors";
import { cache, logger } from "./../utils";

export class SchoolController {
    static async createAcademicYear(req: Request, res: Response, next: NextFunction) {
        const { title, subjects, year } = req.body;
        if (!(title && year)) {
            return next(new BadRequestError("title and year fields are required!"));
        }
        try {
            const academicYear = new AcademicYear({ title, /*subjects,*/ year });
            const newAcademicYear = await academicYear.save();

            // Invalidate cache for AcademicYear list
            cache.del("AcademicYearList");

            res.status(201).json(newAcademicYear);
        } catch (error) {
            logger.error(`Error occurred while creating academicYear. Error:${JSON.stringify(error)}`);
            next(new InternalServerError("Error occurred while submitting your request"));
        }
    }
    static async getAcademicYear(req: Request, res: Response, next: NextFunction) {
        const academicYears = await AcademicYear.find({});
        res.status(200).json(academicYears);
    }
    static async updateAcademicYear(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { title, subjects, year } = req.body;
        const academicYear = await AcademicYear.findById(id);
        if (!academicYear) {
            return next(new NotFoundError("Academic year not found!"));

        }
        academicYear.title = title ? title : academicYear.title;
        academicYear.year = year ? year : academicYear.year;
        const updatedAcademicYear = await academicYear.save();
        res.status(200).json(updatedAcademicYear);
    }
    static async deleteAcademicYear(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const deletedAcademicYear = await AcademicYear.findByIdAndDelete(id);
        res.status(200).json({});
    }
    static async createAcademicClass(req: Request, res: Response, next: NextFunction) {
        const { name, academicYear } = req.body;
        if (!(name && academicYear)) {
            return next(new BadRequestError("name and academicYear fields are required!"));
        }
        try {
            const academicClass = new AcademicClass({ name, academicYear });
            const newAcademicClass = await academicClass.save();

            // Invalidate cache for AcademicClass list
            cache.del("AcademicClassList");

            res.status(201).json(newAcademicClass);
        } catch (error) {
            logger.error(`Error occurred while creating academicClass. Error:${JSON.stringify(error)}`);
            next(new InternalServerError("Error occurred while submitting your request"));
        }
    }
    static async getAcademicClass(req: Request, res: Response, next: NextFunction) {
        const academicClasses = await AcademicClass.find({});
        res.status(200).json(academicClasses);
    }
    static async updateAcademicClass(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name, academicYear } = req.body;
        const academicClass = await AcademicClass.findById(id);
        if (!academicClass) {
            return next(new NotFoundError("Academic class not found!"));

        }
        academicClass.name = name
        academicClass.academicYear = academicYear;
        const updatedAcademicClass = await academicClass.save();
        res.status(200).json(updatedAcademicClass);
    }
    static async deleteAcademicClass(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const deletedAcademicClass = await AcademicClass.findByIdAndDelete(id);
        res.status(200).json({});
    }
}