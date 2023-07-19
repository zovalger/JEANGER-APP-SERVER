import express from "express";
import {
	createProductReference_controller,
	deleteProductReference_controller,
  updateProductReference_controller,
} from "../controllers/ProductReference.controller";

const router = express.Router();

// router.get("/", getProducts_controller);
// router.post("/", createProduct_controller);
router.post("/:parentId/:childId", createProductReference_controller);
router.put("/:parentId/:childId", updateProductReference_controller);
router.delete("/:parentId/:childId", deleteProductReference_controller);

export default router;
