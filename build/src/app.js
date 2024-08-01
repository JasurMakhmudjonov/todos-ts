"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const module_1 = require("./start/module");
const run_1 = require("./start/run");
const app = (0, express_1.default)();
(0, module_1.modules)(app, express_1.default);
(0, run_1.runner)(app);
