import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { Coupon } from "../models/coupons.models.js";

const createCoupon = AsyncHandler(async (req, res) => {
  try {
    const { code, discount, expiryDate } = req.body;

    if ([code, discount, expiryDate].some((field) => field === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const coupon = await Coupon.create({
      code,
      discount,
      expiryDate,
    });

    res
      .status(200)
      .json(new ApiResponse(200, coupon, "coupon created successfully"));
  } catch (error) {
    console.log(400, error.message);
    throw new ApiError(400, "Something went wrong during coupon creation");
  }
});

const getCoupons = AsyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.find({});

    if (!coupon) {
      throw new ApiError(400, "No coupon available");
    }

    res
      .status(200)
      .json(new ApiResponse(200, coupon, "Coupon found successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Unable to get coupon");
  }
});

export { createCoupon, getCoupons };
