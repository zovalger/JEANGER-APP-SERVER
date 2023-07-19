import express from "express";
import {
	createProduct_controller,
	deleteProduct_controller,
	getProduct_controller,
	getProducts_controller,
	updateProducts_controller,
} from "../controllers/Product.controller";
import { getProductReference_By_ChildId_controller } from "../controllers/ProductReference.controller";

const router = express.Router();

router.get("/", getProducts_controller);
router.post("/", createProduct_controller);

router.get("/:_id", getProduct_controller);
router.get("/:_id/reference", getProductReference_By_ChildId_controller);

router.put("/:_id", updateProducts_controller);
router.delete("/:_id", deleteProduct_controller);


export default router