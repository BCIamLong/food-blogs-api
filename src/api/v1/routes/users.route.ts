import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  updateUser,
} from "../controllers";
import { asyncCatch } from "../utils";
import validator, { createUserSchema, updateUserSchema } from "../validators";
import { authenticate, authorize } from "../middlewares";

const userRouter = Router();

userRouter.use(asyncCatch(authenticate), asyncCatch(authorize("admin")));

userRouter
  .route("/")
  .get(asyncCatch(getUsers))
  .post(validator(createUserSchema), asyncCatch(postUser));

userRouter
  .route("/:id")
  .get(asyncCatch(getUser))
  .patch(validator(updateUserSchema), asyncCatch(updateUser))
  .delete(asyncCatch(deleteUser));

export default userRouter;
