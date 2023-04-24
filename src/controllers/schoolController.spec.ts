// import { describe, expect, test, jest, it } from '@jest/globals';
import { BadRequestError, InternalServerError, NotFoundError } from "../errors";
import { SchoolController } from "./schoolController";
import { AcademicClass, AcademicYear } from '../models';


describe("SchoolController", () => {
    describe("createAcademicYear", () => {
        it("should return a BadRequestError if title and year are missing", async () => {
            const req = <any>{ body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
            const next = jest.fn();

            await SchoolController.createAcademicYear(req, res, next);

            expect(next).toHaveBeenCalledWith(new BadRequestError("title and year fields are required!"));
        });

        it("should return a new academic year if successful", async () => {
            const req = <any>{ body: { title: "Test Year", year: 2022 } };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const academicYear = new AcademicYear(req.body);
            const newAcademicYear = { _id: "test", ...req.body };
            jest.spyOn(academicYear, "save").mockResolvedValueOnce(newAcademicYear as any);

            await SchoolController.createAcademicYear(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newAcademicYear);
        });

        it("should return an InternalServerError if an error occurs", async () => {
            const req: Partial<any> = { body: { title: "Test Year", year: 2022 } };
            const res: Partial<any> = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            jest.spyOn(AcademicYear.prototype, "save").mockRejectedValueOnce(new Error());

            await SchoolController.createAcademicYear(req as any, res as any, next);

            expect(next).toHaveBeenCalledWith(new InternalServerError("Error occurred while submitting your request"));
        });
    });

    describe("getAcademicYear", () => {
        it("should return a list of academic years", async () => {
            const academicYears = [{ _id: "test", title: "Test Year", year: 2022 }];
            jest.spyOn(AcademicYear, "find").mockResolvedValueOnce(academicYears);
            const req = <any>{};
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await SchoolController.getAcademicYear(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(academicYears);
        });
    });

    describe("updateAcademicYear", () => {
        it("should return a NotFoundError if the academic year is not found", async () => {
            const req = <any>{ params: { id: "test" }, body: { title: "Test Year", year: 2022 } };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            jest.spyOn(AcademicYear, "findById").mockResolvedValueOnce(null);

            await SchoolController.updateAcademicYear(req, res, next);

            expect(next).toHaveBeenCalledWith(new NotFoundError("Academic year not found!"));
        });

        it("should update the academic year and return the updated object", async () => {
            const req = <any>{ params: { id: "test" }, body: { title: "Test Year", year: 2022 } };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const academicYear = new AcademicYear({ title: "Old Year", year: 2021 });
            const updatedAcademicYear = { _id: "test", ...req.body };
            jest.spyOn(AcademicYear, "findById").mockResolvedValueOnce(academicYear);
            jest.spyOn(academicYear, "save").mockResolvedValueOnce(updatedAcademicYear as any);

            await SchoolController.updateAcademicYear(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedAcademicYear);
        });
    });

    describe("deleteAcademicYear", () => {
        it("should delete the academic year and return an empty object", async () => {
            const req = <any>{ params: { id: "test" } };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const deletedAcademicYear = { _id: "test", title: "Test Year", year: 2022 };
            jest.spyOn(AcademicYear, "findByIdAndDelete").mockResolvedValueOnce(deletedAcademicYear);

            await SchoolController.deleteAcademicYear(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({});
        });
    });

    describe("createAcademicClass", () => {
        it("should return a BadRequestError if name and academicYear are missing", async () => {
            const req = <any>{ body: {} };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await SchoolController.createAcademicClass(req, res, next);

            expect(next).toHaveBeenCalledWith(new BadRequestError("name and academicYear fields are required!"));
        });

        it("should return a new academic class if successful", async () => {
            const req = <any>{ body: { name: "Test Class", academicYear: "test" } };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const academicClass = new AcademicClass(req.body);
            const newAcademicClass = { _id: "test", ...req.body };
            jest.spyOn(academicClass, "save").mockResolvedValueOnce(newAcademicClass as any);

            await SchoolController.createAcademicClass(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newAcademicClass);
        });

        it("should return an InternalServerError if an error occurs", async () => {
            const req = <any>{ body: { name: "Test Class", academicYear: "test" } };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            jest.spyOn(AcademicClass.prototype, "save").mockRejectedValueOnce(new Error());

            await SchoolController.createAcademicClass(req, res, next);

            expect(next).toHaveBeenCalledWith(new InternalServerError("Error occurred while submitting your request"));
        });
    });

    describe("getAcademicClass", () => {
        it("should return a list of academic classes", async () => {
            const academicClasses = [{ _id: "test", name: "Test Class", academicYear: "test" }];
            jest.spyOn(AcademicClass, "find").mockResolvedValueOnce(academicClasses);
            const req = <any>{};
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await SchoolController.getAcademicClass(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(academicClasses);
        });
    });

    describe("updateAcademicClass", () => {
        it("should return a NotFoundError if the academic class is not found", async () => {
            const req = <any>{ params: { id: "test" }, body: { name: "Test Class", academicYear: "test" } };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            jest.spyOn(AcademicClass, "findById").mockResolvedValueOnce(null);

            await SchoolController.updateAcademicClass(req, res, next);

            expect(next).toHaveBeenCalledWith(new NotFoundError("Academic class not found!"));
        });

        it("should update the academic class and return the updated object", async () => {
            const req = <any>{ params: { id: "test" }, body: { name: "Test Class", academicYear: "test" } };
            const res = <any>{ status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const academicClass = new AcademicClass({ name: "Old Class", academicYear: "old" });
            const updatedAcademicClass = { _id: "test", ...req.body };
            jest.spyOn(AcademicClass, "findById").mockResolvedValueOnce(academicClass);
            jest.spyOn(academicClass, "save").mockResolvedValueOnce(updatedAcademicClass as any);

            await SchoolController.updateAcademicClass(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedAcademicClass);
        });
    });

    describe("deleteAcademicClass", () => {
        it("should delete the academic class and return an empty object", async () => {
            const req = { params: { id: "test" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const deletedAcademicClass = { _id: "test", name: "Test Class", academicYear: "test" };
            jest.spyOn(AcademicClass, "findByIdAndDelete").mockResolvedValueOnce(deletedAcademicClass);

            await SchoolController.deleteAcademicClass(req as any, res as any, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({});
        });
    });
});