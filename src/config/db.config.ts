import mongoose from "mongoose";

const DB_URL = process.env.DB_LOCAL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL!);
    console.log("DB connect successful");
  } catch (err) {
    console.log("Fail connect to DB!");
  }
};

export { DB_URL, connectDB };
