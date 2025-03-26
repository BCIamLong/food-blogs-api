// import { Request, Response } from "express";
import {
  createUser,
  editUser,
  fetchUser,
  fetchUsers,
  removeUser,
} from "../services";
import { User, UserInput } from "../interfaces";
// import User from "../models/user.model";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "./factory.controller";

// const getUsers = async function (req: Request, res: Response) {
//   const users = await fetchUsers();
//   res.json({
//     status: "success",
//     data: {
//       users,
//     },
//   });
// };

// const getUser = async function (req: Request, res: Response) {
//   const user = await fetchUser(req.params.id);
//   res.json({
//     status: "success",
//     data: {
//       user,
//     },
//   });
// };

// const postUser = async function (req: Request, res: Response) {
//   // const { name, email, password, passwordConfirm } = req.body as UserInput;
//   // const user = await User.create({ name, email, password, passwordConfirm });
//   const user = await User.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: {
//       newUser: user,
//     },
//   });
// };

// const updateUser = async function (req: Request, res: Response) {
//   const user = await editUser(req.params.id, req.body);
//   res.json({
//     status: "success",
//     data: {
//       user,
//     },
//   });
// };
// const deleteUser = async function (req: Request, res: Response) {
//   await removeUser(req.params.id);
//   res.json({
//     status: "success",
//     data: null,
//   });
// };

export const getUsers = getAll<User>(fetchUsers);
export const getUser = getOne<User>(fetchUser);
export const postUser = postOne<User, UserInput>(createUser);
export const updateUser = updateOne<User, UserInput>(editUser);
export const deleteUser = deleteOne<User>(removeUser);

// export { getUsers, getUser, postUser, updateUser, deleteUser };
