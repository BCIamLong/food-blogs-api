import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationErrorItem, ValidationResult } from "joi";
import { AppError } from "../utils";

const validator = function (schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error }: ValidationResult = schema.validate(req.body);

    if (error) throw new AppError(400, error.message);

    next();
  };
};

export default validator;

export * from "./blog.schema";
export * from "./user.schema";
