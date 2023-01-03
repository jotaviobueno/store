import {Router} from "express";

export const userRoutes = Router();

import UserController from "../modules/user/UserController.js";

// Middlawares
import ValidateSession from "../Middleware/ValidateSession.js";
import ValidateUser from "../Middleware/ValidateUser.js";

userRoutes.post("/", UserController.create);
userRoutes.get("/", ValidateSession, ValidateUser, UserController.showProfile);
userRoutes.get("/:username", ValidateSession, ValidateUser, UserController.showOutherProfile);