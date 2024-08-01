"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controllers_1 = require("../controllers/todos.controllers");
const is_auth_middleware_1 = __importDefault(require("../middlewares/is-auth.middleware"));
const router = (0, express_1.Router)();
const route = "/todos";
router.post(`${route}/`, is_auth_middleware_1.default, todos_controllers_1.create);
router.get(`${route}/`, is_auth_middleware_1.default, todos_controllers_1.show);
router.get(`${route}/:id`, is_auth_middleware_1.default, todos_controllers_1.showById);
router.put(`${route}/:id`, is_auth_middleware_1.default, todos_controllers_1.update);
router.delete(`${route}/:id`, is_auth_middleware_1.default, todos_controllers_1.remove);
exports.default = router;
