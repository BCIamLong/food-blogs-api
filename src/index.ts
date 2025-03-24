import "dotenv/config";
import app from "./app";
import { connectDB } from "./config";

connectDB();

app.listen(3000, () => console.log("Server is listening"));
