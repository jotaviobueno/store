import {Router} from "express";

export const authRoutes = Router();

import AuthTokenController from "../modules/User/AuthTokenController.js";

authRoutes.post("/generate-token/change-password", AuthTokenController.generateTokenToChangePassword);