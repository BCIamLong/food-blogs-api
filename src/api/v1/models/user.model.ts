import { model, Query, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../interfaces";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: `user-${uuidv4()}`,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rule: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    passwordUpdatedAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = function (curPwd: string, hashPwd: string) {
  return bcrypt.compare(curPwd, hashPwd);
};

userSchema.methods.hashPassword = function (pwd: string) {
  return bcrypt.hash(pwd, 10);
};

userSchema.pre(/^find/, function (next) {
  (this as Query<User | User[], User>).select("-__v");
  next();
});

const User = model<User>("User", userSchema);

export { User };
