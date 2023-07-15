import express from "express";
import {
	createProduct_controller,
	getProducts_controller,
} from "../controllers/Product.controller";

const router = express.Router();

router.get("/", getProducts_controller);

router.post("/", createProduct_controller);
