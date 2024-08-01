import { NextFunction, Request, Response } from "express";
import { IloginUser, IRegisterUser } from "../types/user.types";
import { prisma } from "../utils/connection";
import { createToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import Joi from "joi";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, email, password } = req.body as IRegisterUser;
    const schema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(4).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const findUser = await prisma.users.findUnique({ where: { email } });
    if (findUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { fullname, email, password: hashedPassword },
    });
    const token = createToken({ userId: user.id });

    res.status(201).json({ message: "Created", user, token }); // Include the token in the response
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as IloginUser;
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token: string = createToken({ userId: user.id });

    res.json({ message: "Logged in", token });
  } catch (error) {
    next(error);
  }
};

export const showAllUsers = async (req: Request, res: Response) => {
  await prisma.users.findMany().then((users) => res.json(users));
};
