import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string(),
});

export const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  passwordConfirm: Joi.string(),
  rule: Joi.string().valid("user", "admin").optional(),
  isSubscribed: Joi.boolean().optional,
});
