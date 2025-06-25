import { Router } from "express";
import createHttpError from "http-errors";

const defaultRoutes = Router();

defaultRoutes.use("/", (_req, res) => {
	res.status(200).send("API is running....");
});

// catch 404 and forward to error handler
defaultRoutes.use((_req, _res, next) => next(createHttpError(404)));

defaultRoutes.use((err: any, req: any, res: any) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.json({ error: err });
});

export default defaultRoutes;
