import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { NODE_ENV } from "./config";
import Api_v2 from "./routes/api_v2";
import defaultRoutes from "./routes";

const app = express();

if (NODE_ENV == "dev") app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v2", Api_v2);
app.use(defaultRoutes);

export default app;
