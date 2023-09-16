import createError from "http-errors";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { NODE_ENV } from "./config";

// ****************************************************************************
// 										              Endpoints
// ****************************************************************************

import DolarRouter from "./routes/ForeignExchange.route";
import StopwatchRouter from "./routes/Stopwatch.route";
import ProductRouter from "./routes/Product.route";
import ProductReferencesRouter from "./routes/ProductReference.route";
import ProductSettingsRouter from "./routes/ProductSettings.route";
import BillRouter from "./routes/Bill.route";

// ****************************************************************************
// 										           Inicio de App
// ****************************************************************************

const app = express();

app.use(cors());

if (NODE_ENV !== "production") app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "./uploads",
		debug: NODE_ENV !== "production",
	})
);

// ****************************************************************************
// 										              Endpoints api
// ****************************************************************************

app.use("/api/foreign_exchange", DolarRouter);
app.use("/api/stopwatch", StopwatchRouter);
app.use("/api/product", ProductRouter);
app.use("/api/product/reference", ProductReferencesRouter);
app.use("/api/product_settings", ProductSettingsRouter);
app.use("/api/bill", BillRouter);

app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

app.get("/", (_req, res) => {
	res.send("API is running....");
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

// error handler
app.use((err: any, req: any, res: any) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

export default app;
