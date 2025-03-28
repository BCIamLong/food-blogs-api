import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_JWT_SECRET } from "~/config";

export const signToken = function <T>(
  payload: T & {},
  secret: string,
  expiresIn: number
) {
  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
};
