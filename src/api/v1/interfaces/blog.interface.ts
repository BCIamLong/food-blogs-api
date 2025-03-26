import { Document } from "mongoose";

export interface BlogInput {
  title: string;
  description: string;
  userId: string;
  slug: string;
}

export interface Blog extends BlogInput, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
