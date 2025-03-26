import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { Blog } from "../interfaces";

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
      unique: true,
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

// * by default when we set unique field it will auto set index for this field
// ! but in some cases we need to set the index manually like the way bellow in cases:
// * 1: Compound Indexes (indexing multiple fields together): blogSchema.index({ slug: 1, author: 1 }, { unique: true });
// *2: Custom Index Options (e.g., sparse, background, expires for TTL): blogSchema.index({ slug: 1 }, { sparse: true }); // Allow multiple nulls
// *3: Performance Tuning (e.g., disabling automatic indexing in production):const schema = new Schema({ slug: String }, { autoIndex: false });
// * Later, manually create indexes:
// * await Model.createIndexes();

// blogSchema.index({ slug: 1 });

const Blog = model<Blog>("Blog", blogSchema);

export default Blog;
