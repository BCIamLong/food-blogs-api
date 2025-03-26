import { UserInput } from "../interfaces";
import { User } from "../models";
import { AppError } from "../utils";

export const signin = async function (email: string, password: string) {
  // * validate fields: done with validator
  // * check email is existed?
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError(401, "User does not exist!");
  // * check password
  console.log(password, user.password);
  const check = await user.checkPassword(password, user.password);
  if (!check) throw new AppError(401, "Password is incorrect!");
  // * create access token and refresh token
  // * set cookie
  // * response
  return user;
};

export const signup = async function (data: UserInput) {
  const { password } = data || {};
  // * validate fields
  // * check password and password confirm
  // * hash password
  const newUser = await User.create(data);
  newUser.password = await newUser.hashPassword(password);
  newUser.passwordConfirm = undefined;
  await newUser.save({ validateBeforeSave: false });
  // * save data
  // * trigger event to send welcome email to user
  // * create access token and refresh token
  // * set cookie
  // * response
  return newUser;
};
