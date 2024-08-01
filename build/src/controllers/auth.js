"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAllUsers = exports.login = exports.register = void 0;
const connection_1 = require("../utils/connection");
const jwt_1 = require("../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const register = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;
        const schema = joi_1.default.object({
            fullname: joi_1.default.string().required(),
            email: joi_1.default.string().required(),
            password: joi_1.default.string().min(4).required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const findUser = await connection_1.prisma.users.findUnique({ where: { email } });
        if (findUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await connection_1.prisma.users.create({
            data: { fullname, email, password: hashedPassword },
        });
        const token = (0, jwt_1.createToken)({ userId: user.id });
        res.status(201).json({ message: "Created", user, token }); // Include the token in the response
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const schema = joi_1.default.object({
            email: joi_1.default.string().email(),
            password: joi_1.default.string(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const user = await connection_1.prisma.users.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = (0, jwt_1.createToken)({ userId: user.id });
        res.json({ message: "Logged in", token });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const showAllUsers = async (req, res) => {
    await connection_1.prisma.users.findMany().then((users) => res.json(users));
};
exports.showAllUsers = showAllUsers;
