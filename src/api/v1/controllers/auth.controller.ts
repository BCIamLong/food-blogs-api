import { Request, Response } from "express";
import { signin, signup } from "../services";

export const login = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await signin(email, password);

  res.json({
    status: "success",
    user,
  });
};

export const register = async function (req: Request, res: Response) {
  const user = await signup(req.body);

  res.json({
    status: "success",
    user,
  });
};
