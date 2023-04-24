import { AdminController } from "./adminController";
import { School } from "./../models";
import { BadRequestError } from "./../errors/bad-request-error";
import { NotFoundError } from "./../errors/not-found-error";
import { InternalServerError } from "./../errors/internal-server-error";
import { generatePassword } from "./../utils/password-generator";
import { sendEmail } from "./../utils/email-sender";
import { cache } from "./../utils/cache";

describe("AdminController", () => {
    describe("postSchoolReg", () => {
        const req = {
            body: {
                name: "Test School",
                address: "123 Test St",
                email: "test@test.com",
                contactPerson: "John Doe",
                phone: "123-456-7890",
                regNo: "123456",
            },
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;
        const next = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return 201 and the new school if input is valid", async () => {
            const saveSpy = jest.spyOn(School.prototype, "save").mockResolvedValueOnce({
                _id: "123",
                ...req.body,
            });

            await AdminController.postSchoolReg(req, res, next);

            expect(saveSpy).toHaveBeenCalledWith();
            expect(cache.del).toHaveBeenCalledWith("schoolList");
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                _id: "123",
                ...req.body,
            });
            expect(next).not.toHaveBeenCalled();
        });

        it("should call next with BadRequestError if any field is missing", async () => {
            const invalidReq = {
                body: {},
            } as any;

            await AdminController.postSchoolReg(invalidReq, res, next);

            expect(next).toHaveBeenCalledWith(new BadRequestError("All fields are required!"));
            expect(cache.del).not.toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it("should call next with InternalServerError if there's an error", async () => {
            jest.spyOn(School.prototype, "save").mockRejectedValueOnce(new Error());

            await AdminController.postSchoolReg(req, res, next);

            expect(next).toHaveBeenCalledWith(new InternalServerError("Error occurred while submitting your request"));
            expect(cache.del).not.toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("getSchoolReg", () => {
        const req = {} as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;
        const next = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return cached school list if it exists", async () => {
            const cachedSchoolList = [{ _id: "123", name: "Test School" }];
            jest.spyOn(cache, "get").mockResolvedValueOnce(cachedSchoolList);

            await AdminController.getSchoolReg(req, res, next);

            expect(cache.get).toHaveBeenCalledWith("schoolList");
            expect(cache.set).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(cachedSchoolList);
            expect(next).not.toHaveBeenCalled();
        });

        it("should fetch school list from database, store in cache and return it", async () => {
            const schools = [{ _id: "123", name: "Test School" }];
            jest.spyOn(cache, "get").mockResolvedValueOnce(undefined);
            jest.spyOn(School, "find").mockResolvedValueOnce(schools);

            await AdminController.getSchoolReg(req, res, next);

            expect(cache.get).toHaveBeenCalledWith("schoolList");
            expect(cache.set).toHaveBeenCalledWith("schoolList", schools);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(schools);
            expect(next).not.toHaveBeenCalled();
        });

        it("should call next with InternalServerError if there's an error", async () => {
            jest.spyOn(cache, "get").mockRejectedValueOnce(new Error());

            await AdminController.getSchoolReg(req, res, next);

            expect(next).toHaveBeenCalledWith(new InternalServerError("Error occurred while submitting your request"));
            expect(cache.set).not.toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("getSchoolById", () => {
        const req = {
            params: {
                id: "123",
            },
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;
        const next = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return the school if it exists", async () => {
            const school = { _id: "123", name: "Test School" };
            jest.spyOn(School, "findOne").mockResolvedValueOnce(school);

            await AdminController.getSchoolById(req, res, next);

            expect(School.findOne).toHaveBeenCalledWith({ _id: "123" });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(school);
            expect(next).not.toHaveBeenCalled();
        });

        it("should call next with NotFoundError if the school doesn't exist", async () => {
            jest.spyOn(School, "findOne").mockResolvedValueOnce(undefined);

            await AdminController.getSchoolById(req, res, next);

            expect(School.findOne).toHaveBeenCalledWith({ _id: "123" });
            expect(next).toHaveBeenCalledWith(new NotFoundError("School not found!"));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it("should call next with InternalServerError if there's an error", async () => {
            jest.spyOn(School, "findOne").mockRejectedValueOnce(new Error());

            await AdminController.getSchoolById(req, res, next);

            expect(next).toHaveBeenCalledWith(new InternalServerError("Error occurred while submitting your request"));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("approveSchool", () => {
        const req = {
            params: {
                id: "123",
            },
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;
        const next = jest.fn();

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should approve the school and send the password if it exists", async () => {
            const school = { _id: "123", name: "Test School", email: "test@test.com", status: null, password: "0.5", save: jest.fn() };
            jest.spyOn(School, "findOne").mockResolvedValueOnce(school);
            jest.spyOn(global.Math, "random").mockReturnValueOnce(0.5);
            jest.spyOn(global.console, "log").mockImplementationOnce(() => { });

            await AdminController.approveSchool(req, res, next);

            expect(School.findOne).toHaveBeenCalledWith({ _id: "123" });
            expect(school.status).toBe("approved");
            expect(school.password).toBe("0.5");
            expect(school.save).toHaveBeenCalledWith();
            expect(sendEmail).toHaveBeenCalledWith(school.email, "Your login password", "Your login password is: 0.5");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(school);
            expect(next).not.toHaveBeenCalled();
        });

        it("should call next with NotFoundError if the school doesn't exist", async () => {
            jest.spyOn(School, "findOne").mockResolvedValueOnce(undefined);

            await AdminController.approveSchool(req, res, next);

            expect(School.findOne).toHaveBeenCalledWith({ _id: "123" });
            expect(next).toHaveBeenCalledWith(new NotFoundError("School not found!"));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
            expect(sendEmail).not.toHaveBeenCalled();
        });

        it("should call next with InternalServerError if there's an error", async () => {
            jest.spyOn(School, "findOne").mockRejectedValueOnce(new Error());

            await AdminController.approveSchool(req, res, next);

            expect(next).toHaveBeenCalledWith(new InternalServerError("Error occurred while submitting your request"));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
            expect(sendEmail).not.toHaveBeenCalled();
        });
    });
});