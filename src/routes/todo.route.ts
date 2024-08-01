import { Router } from "express";
import {
  create,
  remove,
  show,
  showById,
  update,
} from "../controllers/todos.controllers";
import isAuth from "../middlewares/is-auth.middleware";
const router = Router();

const route: string = "/todos";

router.post(`${route}/`, isAuth, create);
router.get(`${route}/`, isAuth, show);
router.get(`${route}/:id`, isAuth, showById);
router.put(`${route}/:id`, isAuth, update);
router.delete(`${route}/:id`, isAuth, remove);

export default router;
