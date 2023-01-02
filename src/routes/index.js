import {Router} from "express";
// Routes
import {userRoutes} from "./UserRoutes.js";

export const indexRouter = Router();

indexRouter.use("/user", userRoutes);