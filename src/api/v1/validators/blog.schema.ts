import Joi from "joi";

const createBlogSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  userId: Joi.string(),
  slug: Joi.string(),
});

// const updateBlogSchema = Joi.object({
//   title: Joi.string().optional(),
//   description: Joi.string().optional(),
//   userId: Joi.string().optional(),
//   slug: Joi.string().optional(),
// });

const updateBlogSchema = createBlogSchema.fork(
  Object.keys(createBlogSchema.describe().keys), // Get all keys from the schema
  (schema) => schema.optional()
);

export { createBlogSchema, updateBlogSchema };
