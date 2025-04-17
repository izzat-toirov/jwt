import { Router } from "express";
import { productController } from "../controllers/product.js";
import { middleware } from "../middleware/user.js";
import { validateBody } from "../middleware/validation.js";
import { productSchema } from "../validation/product.js";

const router = Router();

router
  .get("/", productController.findAll)
  .get("/:id", productController.findOne)
  .post(
    "/",
    middleware,
    validateBody(productSchema),
    productController.create
  )
  .put(
    "/:id",
    middleware,
    validateBody(productSchema),
    productController.update
  )
  .delete("/:id", middleware, productController.delete);

export { router as productRouter };
