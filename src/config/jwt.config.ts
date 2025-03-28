export const ACCESS_TOKEN_JWT_SECRET = process.env.ACCESS_TOKEN_JWT_SECRET!;
export const REFRESH_TOKEN_JWT_SECRET = process.env.REFRESH_TOKEN_JWT_SECRET!;
export const ACCESS_TOKEN_JWT_EXP = +process.env.ACCESS_TOKEN_JWT_EXP!;
export const REFRESH_TOKEN_JWT_EXP =
  +process.env.REFRESH_TOKEN_JWT_EXP! * 60 * 60 * 24;
