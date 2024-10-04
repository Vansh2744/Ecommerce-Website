import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
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



function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  const navigate = useNavigate();

  const {customer, setCustomer} = useContext(UserContext);
  const {setCategory} = useContext(CategoryContext);

  const handleProfile = () => {
    setOpen((prev)=>!prev);
  };

  const handleCategory = () => {
    setOpenCat((prev)=>!prev);
  };

const user = customer.role === "customer";
const admin = customer.role === "admin";

  
  const handleLogout = () => {
    axios
      .post("/api/v1/user/logout")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });

      setCustomer("");
      setOpen(false);
    
    navigate("/login");
  };

  const handleFashionToggle = ()=>{
    setCategory("Fashion");
    setOpenCat(false);
  }

  const handleSportsToggle = () => {
    setCategory("Sports");
    setOpenCat(false);
  };

  const handleElectronicsToggle = () => {
    setCategory("Electronics");
    setOpenCat(false);
  };


  return (
    <div className="relative">
      <header className="bg-gray-200 p-5 flex justify-between shadow-md shadow-slate-400 fixed top-0 w-full">
        <button>E-Commerce</button>
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
            onClick={handleCategory}>
            <Logs />
            <span>Categories</span>
          </button>

          {openCat ? (
            <>
              <div className="absolute top-24 right-52 flex flex-col w-60 bg-slate-500 gap-1 p-1">
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
                onClick={handleProfile}>
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
              <div className="absolute top-24 right-0 flex flex-col w-60 bg-slate-500 gap-1 p-1">
                <div className="flex flex-col justify-center items-center gap-2 mb-8 mt-4">
                  <img
                    src="profilepic/profile.jpg"
                    className="h-20 rounded-full"
                  />
                  <p className="text-2xl font-extrabold">{customer.name}</p>
                  <p className="text-xl text-orange-700">{customer.email}</p>
                </div>
                {user ? (
                  <>
                    <button className="bg-slate-400">Wishlist</button>
                    <button className="bg-slate-400">Cart</button>
                    <button className="bg-slate-400">Orders</button>
                  </>
                ) : (
                  ""
                )}
                <button className="bg-slate-400">Coupons</button>
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
