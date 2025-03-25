import { Router } from "express";
import userRouter from "./users.route";
import blogRouter from "./blog.route";

const routes = Router();

routes.use("/api/v1/users", userRouter);
routes.use("/api/v1/blogs", blogRouter);

export default routes;
