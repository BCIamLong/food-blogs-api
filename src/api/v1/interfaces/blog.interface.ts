export interface BlogInput {
  title: string;
  description: string;
  userId: string;
  slug: string;
}

export interface Blog extends BlogInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
