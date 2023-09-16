import express from "express";
import CNE_CIValidator from "../validators/CNE_CIValidator";
import { getCNE_CI_controller } from "../controllers/Utility.controller";

const router = express.Router();

router.get("/cne", CNE_CIValidator, getCNE_CI_controller);

export default router;
