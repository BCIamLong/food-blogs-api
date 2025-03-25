import { UserInput } from "../interfaces";
import User from "../models/user.model";

const fetchUsers = async function () {
  const users = await User.find();

  return users;
};
const fetchUser = async function (id: string) {
  const user = await User.findById(id);

  return user;
};
const createUser = async function (data: UserInput) {
  const newUser = await User.create(data);
  return newUser;
};
const editUser = async function (id: string, data: Partial<UserInput>) {
  const editedUser = await User.findByIdAndUpdate(id, data);

  return editedUser;
};
const removeUser = async function (id: string) {
  await User.findByIdAndDelete(id);
};

export { fetchUsers, fetchUser, createUser, editUser, removeUser };
