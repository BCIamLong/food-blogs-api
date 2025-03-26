import { Request, Response } from "express";

export const getAll = function <T>(
  fn: (queryStr: any) => Promise<T[] | unknown>
) {
  return async function (req: Request, res: Response) {
    const data = await fn(req.query);

    res.json({
      status: "success",
      data: {
        data,
      },
    });
  };
};

export const getOne = function <T>(fn: (id: string) => Promise<T | unknown>) {
  return async function (req: Request, res: Response) {
    const data = await fn(req.params.id);

    res.json({
      status: "success",
      data: {
        data,
      },
    });
  };
};

export const postOne = function <T, I>(fn: (data: I) => Promise<T | unknown>) {
  return async function (req: Request, res: Response) {
    const data = await fn(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data,
      },
    });
  };
};

export const updateOne = function <T, I>(
  fn: (id: string, data: Partial<I>) => Promise<T | unknown>
) {
  return async function (req: Request, res: Response) {
    const data = await fn(req.params.id, req.body);

    res.json({
      status: "success",
      data: {
        data,
      },
    });
  };
};

export const deleteOne = function <T>(fn: (id: string) => void) {
  return async function (req: Request, res: Response) {
    await fn(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  };
};

// export { getAll, getOne, deleteOne, postOne, updateOne };
