import express from "express";
import { getBills_controller } from "../controllers/Bill.controller";

const router = express.Router();

router.get("/", getBills_controller);

export default router;
