import { Application } from "express";
import { config } from "../../config";

export const runner = (app: Application) => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

