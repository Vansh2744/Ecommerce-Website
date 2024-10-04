import { Product } from "../models/products.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const createProducts = AsyncHandler(async (req, res) => {
  try {
    const { name, description, price, discount, category } = req.body;

    if (
      [name, description, price, discount, category].some(
        (field) => field === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

     if (!req.file) {
       throw new ApiError(400, "No image uploaded");
     }

    const imagePath = req.file?.path;
    

    if (!imagePath) {
      throw new ApiError(400, "Unable to get Image Path");
    }

    const image = await uploadCloudinary(imagePath);

    if (!image || !image.url) {
      throw new ApiError(500, "Image upload to Cloudinary failed");
    }

    const product = await Product.create({
      name,
      description,
      image: image.url,
      price,
      discount,
      category,
    });

    res
      .status(200)
      .json(new ApiResponse(200, product, "Product created successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Products not created");
  }
});

const getAllProducts = AsyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res
      .status(200)
      .json(new ApiResponse(200, products, "Products found successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(401, "Products not found");
  }
});

const toggleIsWishlisted = AsyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError(400, "Product not found using the id in params");
    }

    product.isWishlisted = !product.isWishlisted;
    const updatedProduct = await product.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(401, "Unable to Toggle isWishListed");
  }
});

const getWishlistedProducts = AsyncHandler(async (req, res) => {
  try {
    const products = await Product.find({
      isWishlisted: true,
    });

    if (!products) {
      throw new ApiError(400, "WishListed Products not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, products, "WishListed Products found successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Unable to find wishlisted products");
  }
});

const getProductByCategory = AsyncHandler(async (req,res)=>{
  try {
    const products = await Product.find({category:req.params.category});

    if(!products){
      throw new ApiError(400,"Products not found");
    }

    res.status(200).json(new ApiResponse(200,products,"Products found successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400,"Unable to get product by category");
  }
})

const deleteProduct = AsyncHandler(async (req,res)=>{
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
     
    res.status(200).json(new ApiResponse(200, product, "Product deleted successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Unable to delete product");
  }
})

const getProductById = AsyncHandler(async(req,res)=>{
  try {
    const products = await Product.findById(req.params.id);

    if(!products){
      throw new ApiError(400, "Product not found using the id in params");
    }

    res.status(200).json(new ApiResponse(200, products, "Product found successfully"));

  } catch (error) {
    throw new ApiError(404, "Product not found");
  }
})

export {
  createProducts,
  getAllProducts,
  toggleIsWishlisted,
  getWishlistedProducts,
  deleteProduct,
  getProductByCategory,
  getProductById
};
