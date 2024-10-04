import { Router } from "express";
import {
  createProducts,
  getAllProducts,
  toggleIsWishlisted,
  getWishlistedProducts,
  deleteProduct,
  getProductByCategory,
  getProductById
} from "../controllers/Products.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/createProducts").post(upload.single("image"), createProducts);
router.route("/getAllProducts").get(getAllProducts);
router.route("/toggleIsWishlisted/:id").post(toggleIsWishlisted);
router.route("/getWishlistedProducts").get(getWishlistedProducts);
router.route("/deleteProduct/:id").post(deleteProduct);
router.route("/getProductByCategory/:category").get(getProductByCategory);
router.route("/getProductById/:id").get(getProductById);

export default router;
