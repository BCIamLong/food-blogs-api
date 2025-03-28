import { User } from "../interfaces";

// * this is the way we can extend the request type in the @types/express (package we already install contains types in express to support develop the app easier)
// * we can also create our own @types/express by create the @types folder and in here create express.d.ts and create our type
// * but since express provide us @types/express package we just download and if needed we can custom it
// * we also can custom it with interface just create the custom request and extends Request type

declare global {
  namespace Express {
    interface Request {
      user: User; // or any if you don't have a specific User type
    }
  }
}
