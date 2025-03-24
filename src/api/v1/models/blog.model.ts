import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const blogSchema = new Schema(
  {
    id: {
      type: String,
      default: `blog-${uuidv4()}`,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    reports: [
      {
        reason: {
          type: String,
          required: true,
        },
        reportedAt: {
          type: Date,
          required: true,
        },
        userId: {
          type: String,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

export default Blog;
