import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function CartPage() {
  const [products, setProducts] = useState([]);
  const [apply, setApply] = useState(false);
  const [cdis, setCdis] = useState(0);

  const handleDecrement = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
    axios
      .post(`/api/v1/cart/updateQuantity/${id}/${1}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleIncrement = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id && product.quantity < 10
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
    axios
      .post(`/api/v1/cart/updateQuantity/${id}/${1}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRemoveCart = async (id) => {
    try {
      const res = await axios.post(`/api/v1/cart/deleteCartProducts/${id}`);
      console.log(res);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/v1/cart/getCartProducts`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const amount = products.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  return (
    <div className="pl-10 pr-10">
      <div className="flex flex-col gap-10 w-full justify-around">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative flex gap-10 bg-slate-300 p-10 shadow-md rounded-xl"
          >
            <img src={product.image} className="max-w-80" />
            <div className="flex flex-col gap-5 p-5 w-full items-center">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p>{product.description}</p>
              </div>
              <div className="flex gap-1">
                <button
                  className="bg-white w-7 text-lg rounded-lg"
                  onClick={() => handleDecrement(product._id)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={product.quantity}
                  readOnly
                  className="bg-gray-500 w-10 text-center rounded-lg"
                />
                <button
                  className="bg-white w-7 text-lg rounded-lg"
                  onClick={() => handleIncrement(product._id)}
                >
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
                onClick={() => handleRemoveCart(product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* ----------------------------- Order Booking --------------------------------------- */}
        <div className="bg-slate-300 p-10 text-center">
          <div className="flex gap-10 mb-10 items-center">
            <p className="bg-violet-500 p-1 w-40 text-orange-900 font-bold ">
              {amount > 1000 ? "BG20 : 20%" : "5%"}
            </p>
            <button
              className="bg-slate-500 p-1 w-20 hover:bg-slate-400"
              onClick={() => {
                setApply(true);
                setCdis(amount > 1000 ? 20 : 5);
                toast.success("Coupon Applied Successfully");
              }}
            >
              Apply
            </button>
          </div>
          <h1 className="text-lg mb-5 font-semibold">Price Details(1 item)</h1>
          <div className="grid grid-cols-2 gap-3">
            <p>Total MRP</p>
            <p>{amount}/-</p>
            <p>Discount on MRP</p>
            <p className="text-yellow-600 font-bold">
              -{Math.floor(amount * (5 / 100))}/-
            </p>
            <p>Coupon Discount</p>
            {apply ? (
              <p>
                {amount > 1000
                  ? Math.floor((20 / 100) * amount)
                  : Math.floor((5 / 100) * amount)}
                /-
              </p>
            ) : (
              "0/-"
            )}
            <p>Platform fee</p>
            <p>20/-</p>
            <p>Shipping Fee</p>
            <p>{amount > 500 ? "0/-" : "70/-"}</p>
            <p>Total Amount</p>
            {apply ? (
              <p className="text-red-600">
                {amount > 500
                  ? amount - Math.floor(amount * (5 / 100)) + 20 - cdis
                  : amount - Math.floor(amount * (5 / 100)) + 20 + 70 - cdis}
                /-
              </p>
            ) : (
              <p className="text-red-600">
                {amount > 500
                  ? amount - Math.floor(amount * (5 / 100)) + 20
                  : amount - Math.floor(amount * (5 / 100)) + 20 + 70}
                /-
              </p>
            )}
          </div>
          <button
            className="bg-orange-600 p-2 w-32 m-5 rounded-lg hover:bg-orange-500"
            onClick={() => {
              toast.success("Order Placed Successfully");
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
