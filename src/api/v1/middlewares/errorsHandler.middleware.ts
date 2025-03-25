import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { AppError } from "../utils";

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
  if (err.isOperation) {
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

const globalErrorsHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "production") return proErrorsHandler(err, res);

  devErrorsHandler(err, res);
};

export { globalErrorsHandler };
