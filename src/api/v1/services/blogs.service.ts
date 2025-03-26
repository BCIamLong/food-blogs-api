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

const fetchBlogs = fetchAll(Blog);
const fetchBlog = fetchOne(Blog);
const createBlog = createOne(Blog);
const editBlog = editOne(Blog);
const removeBlog = removeOne(Blog);

export { fetchBlogs, fetchBlog, createBlog, editBlog, removeBlog };
