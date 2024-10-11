import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CouponPage() {
  const [coupons, setCoupons] = useState([]);
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/coupon/getCoupons")
      .then((res) => {
        console.log(res);
        setCoupons(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [setCoupons]);

   useEffect(() => {
     axios.get("/api/v1/user/getProfile").then((res) => {
       console.log(res);
       setUser(res.data.data);
     });
   }, []);

   const handleRedeem = () => {
     toast.success("Coupon redeemed successfully");
     navigate("/cart");
   };


  return (
    <div className="flex flex-col gap-10">
      {coupons.map((coupon) => {
        return (
          <>
            <div className="flex flex-col gap-3 bg-violet-700 w-1/2 m-auto items-center p-10 shadow-lg shadow-black">
              <p className="text-3xl font-extrabold">{coupon.code}</p>
              <p className="text-xl font-bold text-orange-900">
                {coupon.discount}% OFF
              </p>
              <p className="text-xl font-bold">
                Valid Till : {coupon.expiryDate.substring(0, 10)}
              </p>
              {user.role === "customer" && (
                <button
                  className="bg-amber-600 p-2 w-56 mt-6 hover:bg-amber-500"
                  onClick={handleRedeem}>
                  Redeem
                </button>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
}

export default CouponPage;
