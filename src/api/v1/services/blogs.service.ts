// import { BlogInput } from "../interfaces";
import Blog from "../models/blog.model";
// import { APIFeatures } from "../utils";
import {
  createOne,
  editOne,
  fetchAll,
  fetchOne,
  removeOne,
} from "./factory.service";

// const fetchBlogs = async function (queryStr: any) {
//   const count = await Blog.countDocuments();
//   const queryOb = Blog.find();
//   const apiFeatures = new APIFeatures(queryStr, queryOb)
//     .filter()
//     .sort()
//     .select()
//     .pagination(count);
//   const blogs = await apiFeatures.queryOb;

//   return blogs;
// };

// const fetchBlog = async function (id: string) {
//   const blog = await Blog.findById(id);
//   return blog;
// };
// const createBlog = async function (data: BlogInput) {
//   const newBlog = await Blog.create(data);
//   return newBlog;
// };
// const editBlog = async function (id: string, data: Partial<BlogInput>) {
//   const editedBlog = await Blog.findByIdAndUpdate(id, data);

//   return editedBlog;
// };
// const removeBlog = async function (id: string) {
//   await Blog.findByIdAndDelete(id);
// };

export const fetchBlogs = fetchAll(Blog);
export const fetchBlog = fetchOne(Blog);
export const createBlog = createOne(Blog);
export const editBlog = editOne(Blog);
export const removeBlog = removeOne(Blog);

// export { fetchBlogs, fetchBlog, createBlog, editBlog, removeBlog };
