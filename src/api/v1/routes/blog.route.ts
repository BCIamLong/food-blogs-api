import { Router } from "express";

import {
  deleteBlog,
  getBlog,
  getBlogs,
  postBlog,
  updateBlog,
} from "../controllers";
import { asyncCatch } from "../utils";
import validator, { createBlogSchema, updateBlogSchema } from "../validators";
import { authenticate } from "../middlewares";

const blogRouter = Router();

blogRouter.use(asyncCatch(authenticate));

blogRouter
  .route("/")
  .get(asyncCatch(getBlogs))
  .post(validator(createBlogSchema), asyncCatch(postBlog));

blogRouter
  .route("/:id")
  .get(asyncCatch(getBlog))
  .patch(validator(updateBlogSchema), asyncCatch(updateBlog))
  .delete(asyncCatch(deleteBlog));

export default blogRouter;
