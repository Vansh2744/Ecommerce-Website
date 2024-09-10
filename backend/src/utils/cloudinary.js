import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadCloudinary = async (file) => {
  try {    
    const uploadResult = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    fs.unlinkSync(file);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(file);
    throw new ApiError(400, "Unable to upload image file");
  }
};
