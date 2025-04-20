import { Router } from "express";
import { productController } from "../controllers/product.js";
import { middleware } from "../middleware/user.js"; // Foydalanuvchi autentifikatsiyasi
import { validateBody } from "../middleware/validation.js"; // Validaytsiya middleware
import { productSchema } from "../validation/product.js"; // Mahsulot schema
import { RoleGuard } from "../middleware/role.js"; // RoleGuard middleware
import { roles } from "../middleware/roles.js"; // Ro‘llar

const router = Router();

router
  .get("/", productController.findAll) // Barcha mahsulotlarni ko‘rish
  .get("/:id", productController.findOne) // Mahsulotni ID bo‘yicha topish
  .post(
    "/",
    middleware,
    RoleGuard([roles.ADMIN, roles.SUPERADMIN]),  // Faqat admin va superadmin qo‘shish huquqiga ega
    validateBody(productSchema),
    productController.create
  )
  .put(
    "/:id",
    middleware,
    RoleGuard([roles.ADMIN, roles.SUPERADMIN]),  // Faqat admin va superadmin yangilash huquqiga ega
    validateBody(productSchema),
    productController.update
  )
  .delete(
    "/:id",
    middleware,
    RoleGuard([roles.ADMIN, roles.SUPERADMIN]),  // Faqat admin va superadmin o‘chirish huquqiga ega
    productController.delete
  );

export { router as productRouter };
