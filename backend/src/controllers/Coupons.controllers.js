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

     res.status(200).json(new ApiResponse(200,coupon,"coupon created successfully"));

 } catch (error) {
    console.log(400, error.message);
    throw new ApiError(400, "Something went wrong during coupon creation");
 }
});

const getCoupons = AsyncHandler(async(req,res)=>{
    try {
        const coupon = await Coupon.find({});

        if(!coupon){
            throw new ApiError(400,"No coupon available");
        }

        res.status(200).json(new ApiResponse(200,coupon,"Coupon found successfully"))
    } catch (error) {
        console.log(error.message);
        throw new ApiError(400, "Unable to get coupon");
    }
})

const validateCoupon = AsyncHandler(async (req,res)=>{
    try {
        const {code} = req.body;

        if(!code){
            throw new ApiError(400, "Coupon code is required");
        }

        const coupon = await Coupon.findOne({code});

        if(!coupon){
            throw new ApiError(400,"Invalid Coupon Code");
        }

        if(!coupon.isActive){
            res
              .status(400)
              .json(
                new ApiResponse(200, "Coupon is not Active")
              );
        }

        if(coupon.expiryDate < Date.now()){
            coupon.isActive = false;
            await coupon.save();
            res
              .status(400)
              .json(
                new ApiResponse(200,"Coupon is Expired")
              );
        }

        res.status(200).json(new ApiResponse(200,coupon,"Coupon validated successfully"));

    } catch (error) {
        console.log(error.message);
        throw new ApiError(400, "Unable to validate coupon");
    }
})

export { createCoupon, getCoupons, validateCoupon };
