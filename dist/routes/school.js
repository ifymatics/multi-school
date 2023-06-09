"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolRoutes = void 0;
const schoolController_1 = require("./../controllers/schoolController");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.schoolRoutes = router;
router.post("/academic-year", schoolController_1.SchoolController.createAcademicYear);
router.get("/academic-year", schoolController_1.SchoolController.getAcademicYear);
router.patch("/academic-year/:id", schoolController_1.SchoolController.updateAcademicYear);
router.delete("/academic-year/:id", schoolController_1.SchoolController.createAcademicYear);
router.post("/academic-class", schoolController_1.SchoolController.createAcademicClass);
router.get("/academic-class", schoolController_1.SchoolController.getAcademicClass);
router.patch("/academic-class/:id", schoolController_1.SchoolController.updateAcademicClass);
router.delete("/academic-class/:id", schoolController_1.SchoolController.deleteAcademicClass);
