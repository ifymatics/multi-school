"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("./../controllers/adminController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/school-reg-request", adminController_1.AdminController.postSchoolReg);
router.get("/school-reg-request", adminController_1.AdminController.getSchoolReg);
router.get("/school-reg-request/:id", adminController_1.AdminController.getSchoolById);
exports.default = router;
