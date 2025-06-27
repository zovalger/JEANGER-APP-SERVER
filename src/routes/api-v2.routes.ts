import { Router } from "express";
import { UserRouter } from "../user-features/user/user.module";

const Api_v2 = Router();

Api_v2.use("/auth", UserRouter);

export default Api_v2;
