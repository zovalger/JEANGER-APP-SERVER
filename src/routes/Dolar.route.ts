import express from "express";

import { getDolar_controller } from "../controllers/Dolar.controller";

const router = express.Router();

router.get("/", getDolar_controller);

export default router;
