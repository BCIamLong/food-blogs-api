export interface UserInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  rule?: "user" | "admin";
  isSubscribed?: boolean;
}

export interface User extends UserInput, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
