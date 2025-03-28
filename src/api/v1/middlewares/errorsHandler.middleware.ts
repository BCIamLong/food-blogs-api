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
  new AppError(409, "Your access is expired, please login again!");

const globalErrorsHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") return devErrorsHandler(err, res);

  // * handle custom errors in production
  let prodError;
  if ((err as CastError).code === 11000) prodError = castError(); //mongoose
  if (err.name === "TokenExpiredError") prodError = jwtExpiredError(); //jwt
  proErrorsHandler(prodError || err, res);
};

export { globalErrorsHandler };
