import express from "express";
import {
	getProductSettings_controller,
	updateProductsSettings_controller,
} from "../controllers/ProductSettings.controller";

const router = express.Router();

router.get("/", getProductSettings_controller);

router.put("/", updateProductsSettings_controller);

export default router;
