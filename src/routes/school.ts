import { SchoolController } from "./../controllers/schoolController";
import { Router } from "express";
const router = Router();

router.post("/academic-year", SchoolController.createAcademicYear);
router.get("/academic-year", SchoolController.getAcademicYear);
router.patch("/academic-year/:id", SchoolController.updateAcademicYear);
router.delete("/academic-year/:id", SchoolController.createAcademicYear);
router.post("/academic-class", SchoolController.createAcademicClass);
router.get("/academic-class", SchoolController.getAcademicClass);
router.patch("/academic-class/:id", SchoolController.updateAcademicClass);
router.delete("/academic-class/:id", SchoolController.deleteAcademicClass)
export { router as schoolRoutes }