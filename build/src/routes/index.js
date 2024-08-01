"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const todo_route_1 = __importDefault(require("./todo.route"));
const routes = [auth_route_1.default, todo_route_1.default];
exports.default = routes;
