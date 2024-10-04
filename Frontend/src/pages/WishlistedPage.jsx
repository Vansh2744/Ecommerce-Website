import { useState, useEffect } from "react";
import axios from "axios";

function WishlistedPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/product/getWishlistedProducts")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [products]);

  const handleWishlistedToggle = async (id) => {
    try {
      const res = await axios.post(`/api/v1/product/toggleIsWishlisted/${id}`);
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
            <div className="pb-4 text-center">
              <h1 className="text-xl font-bold mb-2">{product.name}</h1>
              <h1>{product.description}</h1>
              <h1 className="text-orange-600 text-lg mt-3">{`${product.price}/-`}</h1>
              <h1 className="text-yellow-400 font-bold">
                <span className="line-through text-gray-400 mr-3">{`${Math.floor(
                  product.price / (1 - product.discount / 100)
                )}/-`}</span>
                {`${product.discount}% OFF`}
              </h1>
            </div>
            <button
              className="m-3 mt-4 text-white p-1 pl-3 pr-3 shadow-md shadow-gray-600 bg-slate-600"
              onClick={() => handleWishlistedToggle(product._id)}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default WishlistedPage;
