import { Query, QueryOpThatReturnsDocument } from "mongoose";
import { AppError } from "./errors.util";

export class APIFeatures<T> {
  constructor(
    public queryStrOb: any,
    public queryOb: Query<T[] | T, T>
  ) {}

  filter() {
    const queryStrObject = { ...this.queryStrOb };
    // * remove action sort, fields, limit, page
    const operations = ["sort", "fields", "limit", "page"];

    operations.forEach((str) => delete queryStrObject[str]);

    const queryStrObjectToString = JSON.stringify(queryStrObject);
    queryStrObjectToString.replace(/(gte|lte|gt|lt|ne)/g, (str) => `$${str}`);

    const queryStrObjectFinal = JSON.parse(queryStrObjectToString);

    this.queryOb = this.queryOb.find(queryStrObjectFinal);

    return this;
  }

  sort() {
    if (!this.queryStrOb?.sort) {
      this.queryOb = this.queryOb.sort("-createdAt");
      return this;
    }

    this.queryOb = this.queryOb.sort(this.queryStrOb.sort);

    return this;
  }

  select() {
    const selectStr = this.queryStrOb?.fields;
    if (!selectStr) {
      this.queryOb = this.queryOb.select("-__v");
      return this;
    }
    const selectArr = (selectStr as string).split(",");
    this.queryOb = this.queryOb.select(selectArr);

    return this;
  }

  pagination(count: number) {
    const limit = this.queryStrOb.limit || 10;
    const page = this.queryStrOb.page || 1;
    const totalPages = Math.floor(count / limit) || 1;
    const skip = (page - 1) * limit;

    if (page > totalPages)
      throw new AppError(404, "The page you looking for is not found!");
    if (page < 1)
      throw new AppError(404, "The page you looking for is not found!");

    this.queryOb = this.queryOb.limit(limit).skip(skip);

    return this;
  }
}
