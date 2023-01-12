import {Router} from "express";

export const productRoutes = Router();

import ProductController from "../modules/Product/ProductController.js";
import UpdateProductController from "../modules/Product/UpdateProductController.js";

// Middlawares
import ValidateSession from "../Middleware/ValidateSession.js";
import ValidateUser from "../Middleware/ValidateUser.js";
import ValidateProduct from "../Middleware/ValidateProduct.js";
import ValidateProductOwner from "../Middleware/ValidateProductOwner.js";

productRoutes.post("/", ValidateSession, ValidateUser, ProductController.createProduct);
productRoutes.get("/", ValidateSession, ValidateUser, ProductController.showProdutcs);

productRoutes.patch("/update/name", ValidateSession, ValidateUser, ValidateProduct, ValidateProductOwner, UpdateProductController.updateProductName);
productRoutes.patch("/update/description", ValidateSession, ValidateUser, ValidateProduct, ValidateProductOwner, UpdateProductController.updateProductDescription);
productRoutes.patch("/update/price", ValidateSession, ValidateUser, ValidateProduct, ValidateProductOwner, UpdateProductController.updateProductPrice);
