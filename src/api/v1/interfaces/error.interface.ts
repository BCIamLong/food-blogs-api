import { AppError } from "../utils";

export interface CastError extends AppError {
  code: number;
}
