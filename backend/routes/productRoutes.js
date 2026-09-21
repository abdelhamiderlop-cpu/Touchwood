import express from "express";
import {validateProduct} from "../middleware/validateProduct.js";
import { validateupdateProduct } from "../middleware/validateProduct.js";
import { createProduct } from "../controllers/productController.js";
import { getProducts } from "../controllers/productController.js";
import { updateProduct } from "../controllers/productController.js";
import { getProductById } from "../controllers/productController.js";
import { deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
const router = express.Router();
router.get('/', getProducts);
router.post('/',authMiddleware,adminMiddleware,validateProduct,createProduct);
router.put('/:id',authMiddleware,adminMiddleware,validateupdateProduct,updateProduct);
router.get("/:id", getProductById);

router.delete("/:id",authMiddleware,adminMiddleware, deleteProduct);
export default router;