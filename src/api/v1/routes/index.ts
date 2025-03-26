import { Router } from "express";
import userRouter from "./users.route";
import blogRouter from "./blog.route";
import authRouter from "./auth.route";

const routes = Router();

routes.use("/api/v1/auth", authRouter);
routes.use("/api/v1/users", userRouter);
routes.use("/api/v1/blogs", blogRouter);

export default routes;
