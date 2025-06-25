import express from "express";

import { getForeignExchange_controller, setForeignExchange_controller } from "../controllers/ForeignExchange.controller";

const router = express.Router();

router.get("/", getForeignExchange_controller);
router.post("/", setForeignExchange_controller);

export default router;
