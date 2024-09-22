import {useState} from "react";

function CartPage() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = ()=>{
    if(quantity>1){
      setQuantity(quantity-1)
    }
  }

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="mt-40 flex justify-around">
      <div className="flex h-80 gap-10 bg-slate-300 w-1/2 p-10 shadow-md shadow-gray-600">
        <img src="cargo1.jpg" />
        <div className="flex flex-col gap-5 p-5">
          <div>
            <p className="font-semibold">BULLMER</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              atque.
            </p>
          </div>
          <div className="flex gap-1">
            <button
              className="bg-white w-7 text-lg rounded-lg"
              onClick={handleDecrement}>
              -
            </button>
            <input
              type="text"
              value={quantity}
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
            <p>12000</p>
            <p className="line-through text-gray-400">13000</p>
            <p className="text-red-600 font-medium">70% OFF</p>
          </div>
        </div>
      </div>

      {/* ----------------------------- Order Booking --------------------------------------- */}

      <div className="bg-slate-300 p-10 text-center">
        <div className="flex gap-10 mb-10 items-center">
          <p>Apply Coupons</p>
          <button className="bg-slate-500 p-1 w-20 hover:bg-slate-400">Apply</button>
        </div>
        <h1 className="text-lg mb-5 font-semibold">Price Details(1 item)</h1>
        <div className="grid grid-cols-2 gap-3">
          <p>Total MRP</p>
          <p>3000</p>
          <p>Discount on MRP</p>
          <p>-1000</p>
          <p>Coupon Discount</p>
          <p>-500</p>
          <p>Platform fee</p>
          <p>20</p>
          <p>Shipping Fee</p>
          <p>70</p>
          <p>Total Amount</p>
          <p className="text-red-600">3070</p>
        </div>
        <button className="bg-orange-600 p-2 w-32 m-5 rounded-lg hover:bg-orange-500">Place Order</button>
      </div>
    </div>
  );
}

export default CartPage;
