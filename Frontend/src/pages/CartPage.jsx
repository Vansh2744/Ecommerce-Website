import { useState, useEffect } from "react";
import axios from "axios";

function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/cart/getCartProducts")
      .then((res) => {
        setProducts(res.data.data);
        console.log(products);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [products]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleRemoveCart = async (id) => {
    try {
      const res = await axios.post(`/api/v1/cart/deleteCartProducts/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-10">
      <div className="flex flex-col gap-10 w-full justify-around">
        {products.map((product) => (
          <>
            <div className="flex gap-10 bg-slate-300 p-10 shadow-md rounded-xl">
              <img src={product.image} className="max-w-80"/>
              <div className="flex flex-col gap-5 p-5 w-full items-center">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p>{product.description}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    className="bg-white w-7 text-lg rounded-lg"
                    onClick={handleDecrement}>
                    -
                  </button>
                  <input
                    type="text"
                    value={product.quantity}
                    readOnly
                    className="bg-gray-500 w-12 text-center rounded-lg"
                  />
                  <button
                    className="bg-white w-7 text-lg rounded-lg"
                    onClick={handleIncrement}>
                    +
                  </button>
                </div>
                <div className="flex gap-3">
                  <p>{product.price}/-</p>
                  <span className="line-through text-gray-600 mr-3">{`${Math.floor(
                    product.price / (1 - product.discount / 100)
                  )}/-`}</span>
                  <p className="text-red-600 font-medium">
                    {product.discount}% OFF
                  </p>
                </div>
                <button
                  className="bg-slate-600 hover:bg-slate-500 p-2 pl-5 pr-5 rounded-3xl mt-5 text-white font-bold"
                  onClick={() => handleRemoveCart(product._id)}>
                  Remove
                </button>
              </div>
            </div>
          </>
        ))}

        {/* ----------------------------- Order Booking --------------------------------------- */}
          <div className="bg-slate-300 p-10 text-center">
            <div className="flex gap-10 mb-10 items-center">
              <p>Apply Coupons</p>
              <button className="bg-slate-500 p-1 w-20 hover:bg-slate-400">
                Apply
              </button>
            </div>
            <h1 className="text-lg mb-5 font-semibold">
              Price Details(1 item)
            </h1>
            <div className="grid grid-cols-2 gap-3">
              <p>Total MRP</p>
              <p>4500/-</p>
              <p>Discount on MRP</p>
              <p>-500/-</p>
              <p>Coupon Discount</p>
              <p>0</p>
              <p>Platform fee</p>
              <p>20/-</p>
              <p>Shipping Fee</p>
              <p>70/-</p>
              <p>Total Amount</p>
              <p className="text-red-600">3070</p>
            </div>
            <button className="bg-orange-600 p-2 w-32 m-5 rounded-lg hover:bg-orange-500">
              Place Order
            </button>
          </div>
      </div>
    </div>
  );
}

export default CartPage;
