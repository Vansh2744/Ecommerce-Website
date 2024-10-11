import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState("");


  useEffect(() => {
    axios
      .get("/api/v1/product/getAllProducts")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  useEffect(() => {
    axios.get("/api/v1/user/getProfile").then((res) => {
      console.log(res);
      setCustomer(res.data.data);
    });
  }, [customer, setCustomer]);

  const handleWishlistedToggle = async (id) => {
    try {
      const res = await axios.post(`/api/v1/product/toggleIsWishlisted/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const res = await axios.post(`/api/v1/product/deleteProduct/${id}`);
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = async(id) =>{
    try {
      const res = await axios.post(`/api/v1/cart//addToCart/${id}`);
      toast.success(res.data.message);
      console.log(res);
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <div className="grid grid-cols-5 gap-20 p-10">
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-3 border-lg w-full h-full shadow-lg shadow-gray-400">
            <img src={product.image} className="w-full h-56" />
            <div className="p-4 text-center flex flex-col">
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
              {customer.role === "admin" && (
                <button
                  onClick={() => handleRemoveProduct(product._id)}
                  className="bg-red-600 hover:bg-red-500 mt-4 text-white p-1 pl-3 pr-3 shadow-md shadow-gray-600">
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsPage;
