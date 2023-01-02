import {Router} from "express";
// Routes
import {userRoutes} from "./UserRoutes.js";

const router = Router();

router.use("/user", userRoutes);