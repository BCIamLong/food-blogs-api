import { BlogInput } from "../interfaces";
import Blog from "../models/blog.model";

const fetchBlogs = async function () {
  const blogs = await Blog.find();
  return blogs;
};
const fetchBlog = async function (id: string) {
  const blog = await Blog.findById(id);
  return blog;
};
const createBlog = async function (data: BlogInput) {
  const newBlog = await Blog.create(data);
  return newBlog;
};
const editBlog = async function (id: string, data: Partial<BlogInput>) {
  const editedBlog = await Blog.findByIdAndUpdate(id, data);

  return editedBlog;
};
const removeBlog = async function (id: string) {
  await Blog.findByIdAndDelete(id);
};

export { fetchBlogs, fetchBlog, createBlog, editBlog, removeBlog };
