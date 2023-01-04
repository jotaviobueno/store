import {Router} from "express";
// Routes
import {userRoutes} from "./UserRoutes.js";
import {sessionRoutes} from "./SessionRoutes.js";
import {authRoutes} from "./AuthRoutes.js";

export const indexRouter = Router();

indexRouter.use("/user", userRoutes);
indexRouter.use("/session", sessionRoutes);
indexRouter.use("/auth", authRoutes);