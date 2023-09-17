import express from "express";
import CNE_CIValidator from "../validators/CNE_CIValidator";
import {
	getCNE_CI_controller,
	getConsultMovilnet_controller,
} from "../controllers/Utility.controller";

const router = express.Router();

router.get("/cne", CNE_CIValidator, getCNE_CI_controller);

router.get("/movilnet", getConsultMovilnet_controller);

export default router;
