import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "Unable to generate access and refresh tokens");
  }
};

const setCookies = (res, accessToken, refreshToken) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
  } catch (error) {
    throw new ApiError(400, "Unable to set Cooies");
  }
};

const signup = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if ([name, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fiels are requires");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      throw new ApiError(400, "Unable to create user");
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    setCookies(res, accessToken, refreshToken);

    const createdUser = await User
      .findById(user._id)
      .select("-password -refreshToken");

    res.status(200).json(new ApiResponse(200,createdUser,"User created successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});




export {signup}