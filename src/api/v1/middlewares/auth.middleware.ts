import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils";
import { ACCESS_TOKEN_JWT_SECRET } from "~/config";
import { User } from "../interfaces";
import { fetchUser } from "../services";

export const authenticate = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // ! we can try catch to handle errors or we can leave it for the asyncCatch method, maybe in this case this authenticate middleware we will use many times in many places in our routes so we should use asyncCatch but maybe later on we will have more middlewares and it's not really be used so much so that is good for asyncCatch
  // * to make the code sync let's use asyncCatch method and also if we want we can also try catch for middleware ok
  // 1: check access token and refresh token are existed
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return next(
      new AppError(401, "Please login to continue use this feature!")
    );
  // console.log(req.headers.authorization);
  // 2: decode token
  const decoded = verify(token!, ACCESS_TOKEN_JWT_SECRET) as JwtPayload &
    Partial<User>; //* if it's error it will auto throw jwt error and we need to handle this error in production in our global errors handler
  // 3: check token is expired
  // console.log(decoded);
  const { iat, _id: userId } = decoded;
  if (iat! * 1000 > Date.now())
    return next(
      new AppError(401, "Your access is expired, please login again!")
    );
  // 4: take payload, get user id and check user is existed or not
  const user = await fetchUser(userId!);
  if (!user)
    return next(
      new AppError(
        401,
        "This account recently has removed, please contact us for more information!"
      )
    );
  // 5: check is user's email verified?
  // 6: check is user change password recently?
  if (new Date(user.passwordUpdatedAt!).getTime() > Date.now())
    return next(
      new AppError(
        401,
        "This user recently has changed password, please login again!"
      )
    );
  // 7: set user data to request (consider)
  next();
};

export const authorize = function (...rules: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!rules.includes(req.user.rule!))
      return next(
        new AppError(403, "You don't have permission to do this action!")
      );
    next();
  };
};
