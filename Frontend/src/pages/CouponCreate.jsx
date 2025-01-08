import { useState } from "react";
import axios from "axios";

function CouponCreate() {
  const [coupon, setCoupon] = useState({
    code: "",
    discount: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setCoupon((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/api/v1/coupon/createCoupon`, coupon);

      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center pl-10 pr-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 text-center bg-slate-500 p-20 w-full rounded-xl">
        <div>
          <span className="text-xl font-bold">Coupon Code : </span>
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={coupon.code}
            onChange={handleChange}
            className="w-1/3 border-2 border-gray-400 p-1 focus:outline-none rounded-lg"
          />
        </div>
        <div>
          <span className="text-xl font-bold">Discount(in %) : </span>
          <input
            type="text"
            name="discount"
            placeholder="Discount"
            value={coupon.discount}
            onChange={handleChange}
            className="w-1/3 border-2 border-gray-400 p-1 focus:outline-none rounded-lg"
          />
        </div>
        <div>
          <span className="text-xl font-bold">Expiry Date : </span>
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date"
            value={coupon.expiryDate}
            onChange={handleChange}
            className="w-1/3 border-2 border-gray-400 p-1 focus:outline-none rounded-lg"
          />
        </div>
        <span className="text-xl font-bold">(Date = YYYY-MM-DD)</span>
        <button
          type="submit"
          className="bg-orange-600 w-60 m-auto p-2 mt-5 rounded-lg font-bold hover:bg-orange-500">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CouponCreate;
