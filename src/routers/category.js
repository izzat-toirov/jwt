import express from "express";
import { categoryController } from "../controllers/category.js";
import { middleware } from "../middleware/user.js";
import { validateBody } from "../middleware/validation.js";
import { categorySchema } from "../validation/category.js";

export const categoryRouter = express.Router();


categoryRouter
    .post("/", middleware, validateBody(categorySchema), categoryController.create)
    .get("/", categoryController.findAll)
    .get("/;id", categoryController.findOne)
    .put("/:id", middleware, validateBody(categorySchema), categoryController.update)
    .delete("/:id", categoryController.delete);


