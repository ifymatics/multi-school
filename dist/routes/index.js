"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const school_1 = require("./school");
const super_admin_1 = __importDefault(require("./super-admin"));
const apiKeyRoute_1 = require("./apiKeyRoute");
const router = (0, express_1.Router)();
exports.appRoutes = router;
router.use("/api/admin", super_admin_1.default);
router.use("/api/schools", school_1.schoolRoutes);
router.use("/api/api-keys", apiKeyRoute_1.apiKeyRoutes);
