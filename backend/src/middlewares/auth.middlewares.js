import ApiError from "../utils/ApiError.js";
import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
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


export { protectRoute };
