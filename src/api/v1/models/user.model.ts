import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema(
  {
    id: {
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
    },
    passwordConfirm: {
      type: String,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
