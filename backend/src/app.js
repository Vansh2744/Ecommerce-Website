import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());

// Routes

import authRouter from "./routes/Auth.routes.js";
import productRouter from "./routes/Products.routes.js";
import cartRouter from "./routes/Cart.routes.js";
import couponRouter from "./routes/Coupons.routes.js";

app.use("/api/v1/user/", authRouter);
app.use("/api/v1/product/", productRouter);
app.use("/api/v1/cart/", cartRouter);
app.use("/api/v1/coupon/", couponRouter);
