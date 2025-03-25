import { Query, QueryOpThatReturnsDocument } from "mongoose";
import { AppError } from "./errors.util";

export class APIFeatures<T> {
  constructor(
    public queryStrOb: any,
    public queryOb: Query<T[] | T, T>
  ) {}

  filter() {
    const queryStrObject = this.queryStrOb;
    // * remove action sort, fields, limit, page
    const operations = ["sort", "fields", "limit", "page"];

    operations.forEach((str) => delete queryStrObject[str]);

    const queryStrObjectToString = JSON.stringify(queryStrObject);
    queryStrObjectToString.replace(/(gte|lte|gt|lt)/g, (str) => `$${str}`);

    this.queryOb = this.queryOb.find(JSON.parse(queryStrObjectToString));

    return this;
  }

  sort() {
    if (!this.queryStrOb?.sort)
      return (this.queryOb = this.queryOb.sort("-createdAt"));

    this.queryOb = this.queryOb.sort(this.queryStrOb.sort);

    return this;
  }

  select() {
    const selectStr = this.queryStrOb?.fields;
    if (!selectStr) return (this.queryOb = this.queryOb.select("-__v"));
    this.queryOb = this.queryOb.select(
      (selectStr as string).split(",").join(" ")
    );

    return this;
  }

  pagination(count: number) {
    const limit = this.queryStrOb.limit || 10;
    const page = this.queryStrOb.page || 1;
    const totalPages = Math.floor(count / limit);
    const skip = (page - 1) * limit;

    if (page > totalPages)
      throw new AppError(404, "The page you looking for is not found!");
    if (page < 1)
      throw new AppError(404, "The page you looking for is not found!");

    this.queryOb = this.queryOb.limit(limit).skip(skip);

    return this;
  }
}
