import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { NODE_ENV } from "./common/config";
import routes from "./routes";

const app = express();

if (NODE_ENV == "dev") app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

export default app;
