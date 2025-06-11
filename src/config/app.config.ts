export const ENV = process.env.NODE_ENV;
export const isDev = ENV === "development";
export const isProd = ENV === "production";

export const PORT = +process.env.PORT! || 3000;
