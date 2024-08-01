import { Application } from "express";
import router from "../routes";
import { errorHandler } from "../middlewares/error-handler";

export const modules = (app: Application, express: any): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", router);
  app.use(errorHandler);
};
