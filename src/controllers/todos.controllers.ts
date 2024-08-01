import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/connection";
import { Itodos, IupdateTodo } from "../types/todo.type";
import Joi from "joi";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, user_id } = req.body as Itodos;
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      user_id: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) return res.status(400).json({ error: error.message });

    const findTodo = await prisma.todos.findUnique({ where: { title } });
    if (findTodo) {
      return res
        .status(400)
        .json({ error: "Todo with this title already exists" });
    }

    const todo = await prisma.todos.create({
      data: { title, description, user_id },
    });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, user_id } = req.body as IupdateTodo;
    const schema = Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      user_id: Joi.string(),
    });
    const { error } = schema.validate(req.body);

    if (error) return res.status(400).json({ error: error.message });

    const findTodo = await prisma.todos.findUnique({ where: { id } });
    if (!findTodo) return res.status(404).json({ error: "Todo not found" });
    const todo = await prisma.todos.update({
      where: { id },
      data: { title, description, user_id },
    });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await prisma.todos.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        user_id: true,
        created_at: true,
      },
    });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const removedTodo = await prisma.todos.delete({ where: { id } });
    res.status(200).json({ message: "Deleted ", removedTodo });
  } catch (error) {
    next(error);
  }
};

export const showById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todos.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        user_id: true,
        created_at: true,
      },
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};
