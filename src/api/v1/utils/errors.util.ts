export class AppError extends Error {
  public status: string;
  public isOperation: boolean;
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.status = statusCode < 500 ? "fail" : "error";
    this.isOperation = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// export { AppError };
