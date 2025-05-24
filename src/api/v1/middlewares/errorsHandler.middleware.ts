import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { AppError } from "../utils";
import { CastError } from "../interfaces";

const devErrorsHandler = function (err: AppError, res: Response) {
  const { status, statusCode, stack, message } = err || {};
  res.status(statusCode || 500).json({
    status: status || "error",
    message: message || "Internal Server Error",
    error: err,
    stack,
  });
};

const proErrorsHandler = function (err: AppError, res: Response) {
  const { status, statusCode, stack, message } = err || {};
  if (err?.isOperation) {
    res.status(statusCode).json({
      status,
      message,
    });

    return;
  }

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

const castError = () =>
  new AppError(
    409,
    "Oops! It seems that the data you are trying to save already exists."
  );

const jwtExpiredError = () =>
  new AppError(
    401,
    "Your authentication has expired or is invalid. Please login again!"
  );

const jwtInvalidTokenError = () =>
  new AppError(
    401,
    "Your authentication has expired or is invalid. Please login again!"
  );

const globalErrorsHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") return devErrorsHandler(err, res);

  // * handle custom errors in production
  let prodError;
  // * Why we need to do this, because some errors happen and handle by the library itself therefore it will be handle before we handle like we throw new app error and it will be handle easy in the errors handler
  // * but it's not therefore we need to check these errors like these cases bellow and custom, handle them to the AppError for the errors handler can catch them as the format of error of our application
  if ((err as CastError).code === 11000) prodError = castError(); //mongoose
  if (err.name === "TokenExpiredError") prodError = jwtExpiredError(); //jwt
  if (err.name === "JsonWebTokenError") prodError = jwtInvalidTokenError(); //jwt
  proErrorsHandler(prodError || err, res);
};

export { globalErrorsHandler };
