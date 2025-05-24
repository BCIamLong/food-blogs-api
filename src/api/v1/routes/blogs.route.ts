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

// blogRouter.use(asyncCatch(authenticate));

blogRouter
  .route("/")
  .get(asyncCatch(getBlogs))
  .post(
    asyncCatch(authenticate),
    validator(createBlogSchema),
    asyncCatch(postBlog)
  );

blogRouter
  .route("/:id")
  .get(asyncCatch(getBlog))
  .patch(
    asyncCatch(authenticate),
    validator(updateBlogSchema),
    asyncCatch(updateBlog)
  )
  .delete(asyncCatch(authenticate), asyncCatch(deleteBlog));

export default blogRouter;
