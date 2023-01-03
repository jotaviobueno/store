import {Router} from "express";

export const sessionRoutes = Router();

import SessionController from "../modules/Session/SessionController.js";

sessionRoutes.post("/", SessionController.create);