import {Router} from "express";
import { createCoupon, getCoupons, validateCoupon } from "../controllers/Coupons.controllers.js";

const router = Router();

router.route("/createCoupon").post(createCoupon);
router.route("/getCoupons").get(getCoupons);
router.route("/validateCoupon").post(validateCoupon);


export default router;