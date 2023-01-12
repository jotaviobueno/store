import {Router} from "express";

export const productRoutes = Router();

import ProductController from "../modules/Product/ProductController.js";

// Middlawares
import ValidateSession from "../Middleware/ValidateSession.js";
import ValidateUser from "../Middleware/ValidateUser.js";

productRoutes.post("/", ValidateSession, ValidateUser, ProductController.createProduct);