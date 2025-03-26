import { Model, UpdateQuery } from "mongoose";
import { APIFeatures } from "../utils";
// import { BlogInput } from "../interfaces";

export const fetchAll = function <T>(Model: Model<T>) {
  return async function (queryStr: any) {
    const count = await Model.countDocuments();
    const queryOb = Model.find();
    const apiFeatures = new APIFeatures(queryStr, queryOb)
      .filter()
      .sort()
      .select()
      .pagination(count);
    const data = await apiFeatures.queryOb;

    return data as T[];
  };
};

export const fetchOne = function <T>(Model: Model<T>) {
  return async function (id: string) {
    const data = await Model.findById(id);
    return data as T;
  };
};

export const createOne = function <T, I>(Model: Model<T>) {
  return async function (data: I) {
    const newData = await Model.create(data);
    return newData as T;
  };
};

export const editOne = function <T, I>(Model: Model<T>) {
  return async function (id: string, data: Partial<I> & UpdateQuery<T>) {
    const editedData = await Model.findByIdAndUpdate(id, data);

    return editedData as T;
  };
};

export const removeOne = function <T>(Model: Model<T>) {
  return async function (id: string) {
    await Model.findByIdAndDelete(id);
  };
};

// export { fetchAll, fetchOne, createOne, editOne, removeOne };
