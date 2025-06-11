import { Request, Response } from "express";
import { signin, signup } from "../services";
import { signToken } from "../utils";
import {
  ACCESS_TOKEN_JWT_EXP,
  ACCESS_TOKEN_JWT_SECRET,
  isProd,
  REFRESH_TOKEN_JWT_EXP,
  REFRESH_TOKEN_JWT_SECRET,
} from "~/config";
import { User as IUser } from "../interfaces";

export const login = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await signin(email, password);
  const accessToken = signToken<Partial<IUser>>(
    { _id: user._id },
    ACCESS_TOKEN_JWT_SECRET,
    ACCESS_TOKEN_JWT_EXP
  );
  const refreshToken = signToken<Partial<IUser>>(
    { _id: user._id },
    REFRESH_TOKEN_JWT_SECRET,
    REFRESH_TOKEN_JWT_EXP
  );

  res.cookie("access-token", accessToken, {
    expires: new Date(Date.now() + ACCESS_TOKEN_JWT_EXP * 1000),
    httpOnly: true,
    secure: isProd ? true : false,
  });
  res.cookie("refresh-token", refreshToken, {
    expires: new Date(Date.now() + REFRESH_TOKEN_JWT_EXP * 1000),
    httpOnly: true,
    secure: isProd ? true : false,
  });

  res.json({
    status: "success",
    token: accessToken,
  });
};

export const register = async function (req: Request, res: Response) {
  const user = await signup(req.body);

  res.json({
    status: "success",
    user,
  });
};

export const logout = async function (req: Request, res: Response) {
  res.clearCookie("access-token");
  res.clearCookie("refresh-token");
  res.json({
    status: "success",
    data: null,
  });
};
