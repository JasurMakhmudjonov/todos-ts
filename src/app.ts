import { Application } from "express";
import express from "express";
import { modules } from "./start/module";
import { runner } from "./start/run";

const app: Application = express();

modules(app, express);
runner(app);
