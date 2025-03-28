import { Request, Response } from "express";
import { signin, signup } from "../services";
import { signToken } from "../utils";
import { ACCESS_TOKEN_JWT_SECRET, REFRESH_TOKEN_JWT_SECRET } from "~/config";
import { User as IUser } from "../interfaces";

export const login = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await signin(email, password);
  const accessToken = signToken<Partial<IUser>>(
    { _id: user._id },
    ACCESS_TOKEN_JWT_SECRET
  );
  const refreshToken = signToken<Partial<IUser>>(
    { _id: user._id },
    REFRESH_TOKEN_JWT_SECRET
  );

  // res.cookie("access-token", accessToken, {});
  // res.cookie("refresh-token", refreshToken, {});

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
