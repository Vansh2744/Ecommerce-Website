import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { CategoryContext } from "../context/CategoryContext";
import {toast} from 'react-hot-toast'

function CategoryPage() {
  const [products, setProducts] = useState([]);

  const { customer } = useContext(UserContext);
  const { category } = useContext(CategoryContext);

  useEffect(() => {
    axios
      .get(`/api/v1/product/getProductByCategory/${category}`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [category,products]);

  const handleWishlistedToggle = async (id) => {
    try {
      const res = await axios.post(`/api/v1/product/toggleIsWishlisted/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      const res = await axios.post(`/api/v1/cart//addToCart/${id}`);
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-20 p-10">
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-3 border-lg w-full h-full shadow-lg shadow-gray-400">
            <img src={product.image} className="w-full h-56" />
            <div className="p-4 flex flex-col text-center">
              <h1 className="text-xl font-bold mb-2">{product.name}</h1>
              <h1>{product.description}</h1>
              <h1 className="text-orange-600 text-lg mt-3">{`${product.price}/-`}</h1>
              <h1 className="text-yellow-400 font-bold">
                <span className="line-through text-gray-400 mr-3">{`${Math.floor(
                  product.price / (1 - product.discount / 100)
                )}/-`}</span>
                {`${product.discount}% OFF`}
              </h1>
              {customer.role === "customer" && (
                <>
                  <button
                    className={`${
                      product.isWishlisted
                        ? "bg-orange-600 hover:bg-orange-500"
                        : "bg-slate-600 hover:bg-slate-500"
                    } mt-4 text-white p-1 pl-3 pr-3 shadow-md shadow-gray-600`}
                    onClick={() => handleWishlistedToggle(product._id)}>
                    {`${product.isWishlisted ? "Wishlisted" : "Wishlist"}`}
                  </button>
                  <button
                    className="bg-yellow-600 hover:bg-yellow-500 mt-4 text-white p-1 pl-3 pr-3 shadow-md shadow-gray-600"
                    onClick={() => handleAddToCart(product._id)}>
                    Add To Cart
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryPage;
