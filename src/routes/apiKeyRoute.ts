import { ApiKeyController } from "./../controllers/apiKeyController";
import { Router } from "express";
const router = Router();
router.post("/", ApiKeyController.createApiKeys)
router.post("/verify", ApiKeyController.verifyKey)
export { router as apiKeyRoutes }