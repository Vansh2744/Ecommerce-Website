import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use async version of fs

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload to Cloudinary and remove the local file after the operation
export const uploadCloudinary = async (file) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Handles any type of file (image, video, etc.)
    });

    return uploadResult; // Successfully return Cloudinary response
  } catch (error) {
    throw new ApiError(400, "Unable to upload image file"); // Custom error for upload failure
  } finally {
    // Always attempt to delete the file, whether the upload succeeded or failed
    try {
      await fs.unlink(file);
    } catch (unlinkError) {
      console.error(`Failed to delete file: ${file}`, unlinkError);
    }
  }
};
