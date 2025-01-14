import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const signup = AsyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

    const createdUser = await User.findById(user._id).select("-password");

    res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const validUser = await user.comparePassword(password);

  if (!validUser) {
    throw new ApiError(400, "Invalid credentials");
  }
  

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS in production
    sameSite: "strict", // Prevent CSRF
  };
  
  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);
  
  return res.status(200).json({
    message: "User logged in successfully",
    user: loggedInUser,
  });
  
});

const logout = AsyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(400, "No refresh token found");
  }

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findByIdAndUpdate(
    decodedToken.userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, user, "User logged out successfully"));
});

const getProfile = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized - User not found");
  }

  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(400, "Unable to get profile");
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "Profile fetched successfully"));
  } catch (error) {
    throw new ApiError(400, "Unable to get profile");
  }
});

export { signup, login, logout, getProfile };
