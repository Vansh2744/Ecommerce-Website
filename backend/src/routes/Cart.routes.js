import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import {
  addToCart,
  updateQuantity,
  getCartProducts,
  deleteCartProducts
} from "../controllers/Cart.controllers.js";

const router = Router();

router.route("/addToCart/:productId").post(protectRoute, addToCart);
router.route("/updateQuantity/:productId/:quantity").post(protectRoute, updateQuantity);
router.route("/getCartProducts").get(protectRoute, getCartProducts);
router.route("/deleteCartProducts/:productId").post(protectRoute, deleteCartProducts);

export default router;
