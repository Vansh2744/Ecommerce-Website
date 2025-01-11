import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next()
} catch (error) {
    return res.status(401).json({ message: "Unauthorized User" });
}
};


export { protectRoute };
