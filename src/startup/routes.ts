import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

import { homeRouter } from "../routes/home";
import { usersRouter } from "../routes/user";
import { authRouter } from "../routes/auth";
import error from "../middlewares/error";

export default function (app: Express) {
  // MIDDLEWARES
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  // CUSTOM MIDDLEWARES
  app.use("/", homeRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  // NOTE THIS MIDDLE WARE ERROR MUST BE THE LAST
  app.use(error);
}
