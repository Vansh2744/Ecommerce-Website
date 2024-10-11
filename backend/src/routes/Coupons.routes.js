import {Router} from "express";
import { createCoupon, getCoupons } from "../controllers/Coupons.controllers.js";

const router = Router();

router.route("/createCoupon").post(createCoupon);
router.route("/getCoupons").get(getCoupons);


export default router;