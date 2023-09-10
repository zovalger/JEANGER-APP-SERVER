import express from "express";

import { getForeignExchange_controller } from "../controllers/ForeignExchange.controller";

const router = express.Router();

router.get("/", getForeignExchange_controller);

export default router;
