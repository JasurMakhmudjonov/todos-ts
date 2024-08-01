import { Router } from "express";
import { login, register, showAllUsers } from "../controllers/auth";

const router = Router();

const route = "/auth";

router.post(`${route}/register`, register);
router.post(`${route}/login`, login);
router.get(`${route}/users`, showAllUsers);

export default router;
