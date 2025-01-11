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
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { CategoryContext } from "../context/CategoryContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [client, setClient] = useState(null);

  const navigate = useNavigate();
  const { customer, setCustomer } = useContext(UserContext);
  const { setCategory } = useContext(CategoryContext);

  useEffect(() => {
    axios
      .get(`/api/v1/user/getProfile`)
      .then((res) => setClient(res.data.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, [customer]);

  const handleLogout = () => {
    axios
      .post("/api/v1/user/logout")
      .then((res) => {
        setCustomer(null);
        setClient(null);
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => toast.error("Logout failed!"));
    setOpen(false);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setOpenCat(false);
  };

  const isUser = client?.role === "customer";
  const isAdmin = client?.role === "admin";

  return (
    <div className="relative z-10">
      <header className="bg-gray-200 p-5 flex justify-between shadow-md fixed top-0 w-full">
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-10 rounded-full shadow-sm"
          />
        </Link>

        <nav className="flex gap-10">
          {/* Home Link */}
          <Link to="/" className="nav-item">
            <House />
            <span>Home</span>
          </Link>

          {/* Products Link */}
          <Link to="/products" className="nav-item">
            <Package />
            <span>Products</span>
          </Link>

          {/* Categories */}
          <div
            className="relative"
            onMouseEnter={() => setOpenCat(true)}
            onMouseLeave={() => setOpenCat(false)}
          >
            <button className="nav-item">
              <Logs />
              <span>Categories</span>
            </button>
            {openCat && (
              <div className="absolute top-10 right-0 bg-slate-500 text-white rounded shadow-lg">
                <Link
                  to="/category"
                  className="dropdown-item"
                  onClick={() => handleCategoryChange("Fashion")}
                >
                  Fashion
                </Link>
                <Link
                  to="/category"
                  className="dropdown-item"
                  onClick={() => handleCategoryChange("Sports")}
                >
                  Sports
                </Link>
                <Link
                  to="/category"
                  className="dropdown-item"
                  onClick={() => handleCategoryChange("Electronics")}
                >
                  Electronics
                </Link>
              </div>
            )}
          </div>

          {/* User Links */}
          {isUser && (
            <>
              <Link to="/cart" className="nav-item">
                <ShoppingCart />
                <span>Cart</span>
              </Link>
              <Link to="/wishlist" className="nav-item">
                <Heart />
                <span>Wishlist</span>
              </Link>
            </>
          )}

          {/* Admin Links */}
          {isAdmin && (
            <Link to="/addProducts" className="nav-item">
              <Package />
              <span>Add Products</span>
            </Link>
          )}

          {/* Profile / Auth */}
          {isUser || isAdmin ? (
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="nav-item">
                <UserPen />
                <span>Profile</span>
              </button>
              {open && client && (
                <div className="absolute top-10 right-0 bg-slate-500 text-white rounded shadow-lg w-60">
                  <div className="flex flex-col items-center gap-2 py-4">
                    <img
                      src="/profilepic/profile.jpg"
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                    <p className="text-lg font-bold">{client.name}</p>
                    <p className="text-sm text-orange-400">{client.email}</p>
                  </div>
                  {isUser && (
                    <>
                      <Link
                        to="/wishlist"
                        className="dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/cart"
                        className="dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        Cart
                      </Link>
                      <Link to="/orders" className="dropdown-item">
                        Orders
                      </Link>
                    </>
                  )}
                  {isAdmin && (
                    <Link to="/createCoupon" className="dropdown-item">
                      Create Coupons
                    </Link>
                  )}
                  <Link to="/coupons" className="dropdown-item">
                    Coupons
                  </Link>
                  <button
                    className="bg-orange-400 hover:bg-orange-500 w-full py-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signup" className="auth-button">
                Signup
              </Link>
              <Link to="/login" className="auth-button">
                <LogIn />
                <span>Login</span>
              </Link>
            </>
          )}
        </nav>
      </header>
      <Toaster />
    </div>
  );
}

export default Navbar;
