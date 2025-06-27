import { Router } from "express";
import Api_v2 from "./api-v2.routes";
import defaultRoutes from "../common/routes/default.routes";

const routes = Router();

routes.use("/api/v2", Api_v2);
routes.use(defaultRoutes);

export default routes;
