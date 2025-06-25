import express from "express";
import { getAllStopwatch_controller } from "../controllers/Stopwatch.controller";


const router = express.Router();

router.get("/", getAllStopwatch_controller);

export default router;
