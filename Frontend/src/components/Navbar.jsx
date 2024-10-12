import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  House,
  ShoppingCart,
  UserPen,
  Heart,
  Package,
  LogIn,
  Logs,
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { CategoryContext } from "../context/CategoryContext";
import { toast } from "react-hot-toast";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [client, setClient] = useState("");

  const navigate = useNavigate();

  const { customer, setCustomer } = useContext(UserContext);

  useEffect(() => {
    axios.get("/api/v1/user/getProfile").then((res) => {
      console.log(res);
      setClient(res.data.data);
    });
  }, [customer, setCustomer]);

  const { setCategory } = useContext(CategoryContext);

  const user = client.role === "customer";
  const admin = client.role === "admin";

  const handleLogout = () => {
    axios
      .post("/api/v1/user/logout")
      .then((res) => {
        setCustomer("");
        setClient("");
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setOpen(false);

    navigate("/login");
  };

  const handleFashionToggle = () => {
    setCategory("Fashion");
    setOpenCat(false);
  };

  const handleSportsToggle = () => {
    setCategory("Sports");
    setOpenCat(false);
  };

  const handleElectronicsToggle = () => {
    setCategory("Electronics");
    setOpenCat(false);
  };

  return (
    <div className="relative z-10">
      <header className="bg-gray-200 p-5 flex justify-between shadow-md shadow-slate-400 fixed top-0 w-full">
        <button>
          <img src="/logo.jpg" alt="logo" className="w-10 rounded-full shadow-sm shadow-black" />
        </button>
        <nav className="flex justify-end gap-10">
          <Link to="/">
            <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
              <House />
              <span>Home</span>
            </button>
          </Link>
          <Link to="/products">
            <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
              <Package />
              <span>Go To Products</span>
            </button>
          </Link>
          <button
            className="flex flex-col justify-center items-center hover:text-orange-600 font-bold"
            onMouseEnter={() => setOpenCat(true)}
            onMouseLeave={() => setOpenCat(false)}>
            <Logs />
            <span>Categories</span>
          </button>

          {openCat ? (
            <>
              <div
                className="absolute top-[70px] right-52 flex flex-col w-60 bg-slate-500 gap-1 p-1"
                onMouseEnter={() => setOpenCat(true)}
                onMouseLeave={() => setOpenCat(false)}>
                <>
                  <Link
                    to="/category"
                    className="bg-slate-400"
                    onClick={handleFashionToggle}>
                    Fashion
                  </Link>
                  <Link
                    to="/category"
                    className="bg-slate-400"
                    onClick={handleSportsToggle}>
                    Sports
                  </Link>
                  <Link
                    to="/category"
                    className="bg-slate-400"
                    onClick={handleElectronicsToggle}>
                    Electronics
                  </Link>
                </>
              </div>
            </>
          ) : (
            ""
          )}

          {user && (
            <>
              <Link to="/cart">
                <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                  <ShoppingCart />
                  <span>Cart</span>
                </button>
              </Link>

              <Link to="/wishlist">
                <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                  <Heart />
                  <span>Wishlist</span>
                </button>
              </Link>
            </>
          )}

          {admin && (
            <>
              <Link to="/addProducts">
                <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                  <Package />
                  <span>Add Products</span>
                </button>
              </Link>
            </>
          )}

          {user || admin ? (
            <>
              <button
                className="flex flex-col justify-center items-center hover:text-orange-600 font-bold"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}>
                <UserPen />
                <span>Profile</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="flex flex-col justify-center items-center hover:text-orange-600 font-bold bg-slate-400 h-12 w-40 rounded-lg">
                Signup
              </Link>
              <Link
                to={"/login"}
                className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                <LogIn />
                <span>Login</span>
              </Link>
            </>
          )}

          {open ? (
            <>
              <div
                className="absolute top-[70px] right-0 flex flex-col w-60 bg-slate-500 gap-1 p-1"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}>
                <div className="flex flex-col justify-center items-center gap-2 mb-8 mt-4">
                  <img
                    src="profilepic/profile.jpg"
                    className="h-20 rounded-full"
                  />
                  <p className="text-2xl font-extrabold">{client.name}</p>
                  <p className="text-xl text-orange-700">{client.email}</p>
                </div>
                {user ? (
                  <>
                    <Link
                      to="/wishlist"
                      className="bg-slate-400"
                      onClick={() => setOpen(false)}>
                      Wishlist
                    </Link>
                    <Link
                      to="/cart"
                      className="bg-slate-400"
                      onClick={() => setOpen(false)}>
                      Cart
                    </Link>
                    <Link className="bg-slate-400">Orders</Link>
                  </>
                ) : (
                  <Link className="bg-slate-400" to="/createCoupon">
                    Create Coupons
                  </Link>
                )}
                <Link className="bg-slate-400" to="/coupons">
                  Coupons
                </Link>
                <button
                  className="bg-orange-400 hover:bg-orange-500"
                  onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </nav>
      </header>
      <Toaster />
    </div>
  );
}

export default Navbar;
