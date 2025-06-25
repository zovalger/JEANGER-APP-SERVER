import { Router } from "express";
import createHttpError from "http-errors";

const defaultRoutes = Router();

defaultRoutes.get("/", (_req, res) => {
	res.send("API is running....");
});

// catch 404 and forward to error handler
defaultRoutes.use((_req, _res, next) => next(createHttpError(404)));

// error handler
defaultRoutes.use((err: any, req: any, res: any) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "dev" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

export default defaultRoutes;
