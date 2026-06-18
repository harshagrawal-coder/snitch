import { Router } from "express";
import multer from "multer";
const ProductRouter = Router();
import {
  createProducts,
  getsellerProducts,
  getAllProducts,
  getSingleProductDetail,
} from "../controller/products.controller.js";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { validationProduct } from "../validator/product.validators.js";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, //10MB
  },
});
ProductRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  validationProduct,
  createProducts,
);
ProductRouter.get("/getall/seller", authenticateSeller, getsellerProducts);

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/details/:id", getSingleProductDetail);
export default ProductRouter;
