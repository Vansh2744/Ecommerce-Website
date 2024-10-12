import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/users.models.js";
import { Product } from "../models/products.models.js";

const addToCart = AsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized User");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  user.cartItems.push(productId);
  await user.save();
  res.json(new ApiResponse(200, user, "Added to cart"));
});

const updateQuantity = AsyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.params;

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(400, "User not found to update product quantity");
    }

    const cartItem = user.cartItems.find(
      (item) => item._id.toString() === productId
    );

    if (!cartItem) {
      res.status(401).json(new ApiResponse(401, "Product not found in cart"));
    }

    cartItem.quantity = quantity;
    await user.save();
    res
      .status(200)
      .json(
        new ApiResponse(200, user.cartItems, "Quantity updated successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Unable to update quantity");
  }
});

const getCartProducts = AsyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );

      return { ...product.toJSON(), quantity: item.quantity };
    });

    if (!cartItems) {
      throw new ApiError(400, "Cart is Empty");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, cartItems, "Cart Products found successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Error in getting Cart Products");
  }
});

const deleteCartProducts = AsyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      throw new ApiError(400, "Product Id not found");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    const cartItems = user.cartItems;

    if (!cartItems) {
      throw new ApiError(400, "Cart is Empty");
    }

    const newCartItems = cartItems.filter((item) => item.id !== productId);

    user.cartItems = newCartItems;
    await user.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, newCartItems, "Cart Products deleted successfully")
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Error in deleting Cart Products");
  }
});

export { addToCart, updateQuantity, getCartProducts, deleteCartProducts };
