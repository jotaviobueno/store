import {Router} from "express";

export const userRoutes = Router();

import UserController from "../modules/user/UserController.js";

userRoutes.post("/", UserController.create);