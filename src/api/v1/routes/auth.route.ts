import { Router } from "express";
import { login, register } from "../controllers";
import { asyncCatch } from "../utils";
import validator, { loginSchema, registerSchema } from "../validators";
import { authenticate } from "../middlewares";

const authRouter = Router();

// authRouter.use(authenticate);s

authRouter.post("/login", validator(loginSchema), asyncCatch(login));
authRouter.post("/register", validator(registerSchema), asyncCatch(register));

export default authRouter;
