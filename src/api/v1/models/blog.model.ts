import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const blogSchema = new Schema(
  {
    _id: {
      type: String,
      // default: `blog-${uuidv4()}`, //* run once when the schema compiled (static default) after that it will use cached value and do not perform the action again
      default: () => `blog-${uuidv4()}`, //* run per document creation (dynamic default)
      // unique: true, //* by default _id already have unique we just override it
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
