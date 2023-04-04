import { AdminController } from "./../controllers/adminController";
import { Router } from "express";
const router = Router();

router.post("/school-reg-request", AdminController.postSchoolReg)
router.get("/school-reg-request", AdminController.getSchoolReg)
router.get("/school-reg-request/:id", AdminController.getSchoolById)
router.patch("/school-reg-request/:id", AdminController.approveSchool)
export default router;
