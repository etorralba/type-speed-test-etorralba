import express, { Express, Request, Response } from "express";
import createError from "http-errors";
import router from "./routes";

import { dataSrc } from "./loaders";

dataSrc
  .initialize()
  .then(() => {
    console.log("[database]: Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("[database]: Error during Data Source initialization:", err);
  });

const app: Express = express();

app.use(express.json());

app.use("/api", router);

app.use((req: Request, res: Response, next) => {
  next(createError(404));
});

export default app;
