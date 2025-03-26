import { Router } from "express";
import { login, register } from "../controllers";
import { asyncCatch } from "../utils";
import validator, { loginSchema, registerSchema } from "../validators";

const authRouter = Router();

authRouter.post("/login", validator(loginSchema), asyncCatch(login));
authRouter.post("/register", validator(registerSchema), asyncCatch(register));

export default authRouter;
