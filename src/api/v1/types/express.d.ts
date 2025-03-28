import { User } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      user: User; // or any if you don't have a specific User type
    }
  }
}
