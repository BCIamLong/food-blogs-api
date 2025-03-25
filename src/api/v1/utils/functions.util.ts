import { NextFunction, Request, RequestHandler, Response } from "express";

// const asyncCatch = function (fn: RequestHandler) {
//   return async function (req: Request, res: Response, next: NextFunction) {
//     try {
//       await fn(req, res, next);
//     } catch (err) {
//       next(err);
//     }
//   };
// };

const asyncCatch =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export { asyncCatch };
