import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./api/v1/routes";
import { AppError } from "./api/v1/utils";
import { globalErrorsHandler } from "./api/v1/middlewares";

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "90kb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

// 404 handle error
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(404, "Sorry, the page you are looking for could not be found")
  );
});

//global error
app.use(globalErrorsHandler);

export default app;
