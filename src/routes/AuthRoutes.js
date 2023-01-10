import {Router} from "express";

export const authRoutes = Router();

import AuthTokenController from "../modules/User/AuthTokenController.js";

// Middlawares
import ValidateSession from "../Middleware/ValidateSession.js";
import ValidateUser from "../Middleware/ValidateUser.js";

authRoutes.post("/generate-token/change-password", AuthTokenController.generateTokenToChangePassword);
authRoutes.post("/generate-token/delete-account", ValidateSession, ValidateUser, AuthTokenController.generateTokenToDeleteAccount);