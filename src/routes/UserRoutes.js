import {Router} from "express";

export const userRoutes = Router();

import UserController from "../modules/user/UserController";

userRoutes.post("/", UserController.create);