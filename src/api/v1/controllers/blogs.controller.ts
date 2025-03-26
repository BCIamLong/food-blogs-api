// import { Request, Response } from "express";
import {
  createBlog,
  editBlog,
  fetchBlog,
  fetchBlogs,
  removeBlog,
} from "../services";
import { Blog, BlogInput } from "../interfaces";
import {
  deleteOne,
  getAll,
  getOne,
  postOne,
  updateOne,
} from "./factory.controller";

// const getBlogs = async function (req: Request, res: Response) {
//   const blogs = await fetchBlogs(req.query);
//   res.json({
//     status: "success",
//     data: {
//       blogs,
//     },
//   });
// };

// const getBlog = async function (req: Request, res: Response) {
//   const blog = await fetchBlog(req.params.id);
//   res.json({
//     status: "success",
//     data: {
//       blog,
//     },
//   });
// };

// const postBlog = async function (req: Request, res: Response) {
// const { title, description, userId, slug } = req.body as BlogInput;
// const blog = await Blog.create({ title, description, userId, slug });
// * we don't need to do validate here because we did it in the validators with Joi right
//   const blog = await createBlog(req.body);
//   res.status(201).json({
//     status: "success",
//     data: {
//       newBlog: blog,
//     },
//   });
// };

// const updateBlog = async function (req: Request, res: Response) {
//   const blog = await editBlog(req.params.id, req.body);
//   res.json({
//     status: "success",
//     data: {
//       blog,
//     },
//   });
// };
// const deleteBlog = async function (req: Request, res: Response) {
//   await removeBlog(req.params.id);
//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// };

export const getBlogs = getAll<Blog>(fetchBlogs);
export const getBlog = getOne<Blog>(fetchBlog);
export const postBlog = postOne<Blog, BlogInput>(createBlog);
export const updateBlog = updateOne<Blog, BlogInput>(editBlog);
export const deleteBlog = deleteOne<Blog>(removeBlog);

// export { getBlogs, getBlog, postBlog, updateBlog, deleteBlog };
