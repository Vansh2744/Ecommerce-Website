import { Router } from "express";
import {
  signup,
  login,
  logout,
  getProfile,
} from "../controllers/Auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/getProfile").get(protectRoute, getProfile);

export default router;
