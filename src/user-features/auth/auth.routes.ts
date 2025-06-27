import express from "express";
import { UserLoginValidator } from "./validators";
import { signin_user_controller } from "./auth.controller";

const AuthRouter = express.Router();

AuthRouter.post("/signin", UserLoginValidator, signin_user_controller);

export { AuthRouter };
