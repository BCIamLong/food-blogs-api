import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  passwordConfirm: Joi.string(),
  rule: Joi.string().optional().valid("user", "admin"),
  isSubscribed: Joi.boolean().optional(),
});

// const updateUserSchema = createUserSchema.fork(
//   Object.keys(createUserSchema.describe().keys), // Get all keys from the schema
//   (schema) => schema.optional()
// );

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  rule: Joi.string().optional().valid("user", "admin"),
  isSubscribed: Joi.boolean().optional(),
});

export { createUserSchema, updateUserSchema };
