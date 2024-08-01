"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showById = exports.remove = exports.show = exports.update = exports.create = void 0;
const connection_1 = require("../utils/connection");
const joi_1 = __importDefault(require("joi"));
const create = async (req, res, next) => {
    try {
        const { title, description, user_id } = req.body;
        const schema = joi_1.default.object({
            title: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            user_id: joi_1.default.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ error: error.message });
        const findTodo = await connection_1.prisma.todos.findUnique({ where: { title } });
        if (findTodo) {
            return res
                .status(400)
                .json({ error: "Todo with this title already exists" });
        }
        const todo = await connection_1.prisma.todos.create({
            data: { title, description, user_id },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, user_id } = req.body;
        const schema = joi_1.default.object({
            title: joi_1.default.string(),
            description: joi_1.default.string(),
            user_id: joi_1.default.string(),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ error: error.message });
        const findTodo = await connection_1.prisma.todos.findUnique({ where: { id } });
        if (!findTodo)
            return res.status(404).json({ error: "Todo not found" });
        const todo = await connection_1.prisma.todos.update({
            where: { id },
            data: { title, description, user_id },
        });
        res.json(todo);
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const show = async (req, res, next) => {
    try {
        const todos = await connection_1.prisma.todos.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                user_id: true,
                created_at: true,
            },
        });
        res.json(todos);
    }
    catch (error) {
        next(error);
    }
};
exports.show = show;
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const removedTodo = await connection_1.prisma.todos.delete({ where: { id } });
        res.status(200).json({ message: "Deleted ", removedTodo });
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
const showById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await connection_1.prisma.todos.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                user_id: true,
                created_at: true,
            },
        });
        if (!todo)
            return res.status(404).json({ error: "Todo not found" });
        res.json(todo);
    }
    catch (error) {
        next(error);
    }
};
exports.showById = showById;
