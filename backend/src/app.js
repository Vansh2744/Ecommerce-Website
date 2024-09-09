import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

export const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10kb"}));
app.use(cookieParser())
app.use(express.static("public"));

// Routes 

import authRouter from "./routes/Auth.routes.js";

app.use("/api/v1/user/",authRouter);