import ApiError from "../utils/ApiError.js";
import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, _, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new ApiError(400, "No access token found");
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new ApiError(400, "User not found using the token");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);

    throw new ApiError(400, "Invalid token");
  }
};

const isAdmin = async (req, _, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      throw new ApiError(400, "Unauthorized Admin");
    }
  } catch (error) {
    throw new ApiError(400, "Unauthorized Admin");
  }
};

export { protectRoute, isAdmin };
