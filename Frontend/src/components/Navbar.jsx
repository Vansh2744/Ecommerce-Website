import { Link } from "react-router-dom";
import {
  House,
  ShoppingCart,
  LogOut,
  UserPen,
  Heart,
  Package,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

function Navbar() {
const user = true
const isAdmin = false
  return (
    <div className="">
      <header className="bg-gray-200 p-5 flex justify-between shadow-md shadow-slate-400 fixed top-0 w-full">
        <button>E-Commerce</button>
        <nav className="flex justify-end gap-10">
          <Link to="/">
            <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
              <House />
              <span>Home</span>
            </button>
          </Link>
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

              <Link to="/profile">
                <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                  <UserPen />
                  <span>Profile</span>
                </button>
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/addProduct">
                <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                  <Package />
                  <span>Add Product</span>
                </button>
              </Link>

              <Link to="/adminProfile">
                <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                  <UserPen />
                  <span>Profile</span>
                </button>
              </Link>
            </>
          )}

          {user ? (
            <Link>
              <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                <LogOut />
                <span>Logout</span>
              </button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <button className="flex bg-white flex-col justify-center items-center hover:text-orange-600 font-bold">
                  <span>Signup</span>
                </button>
              </Link>
              <Link to="/login">
                <button className="flex flex-col justify-center items-center hover:text-orange-600 font-bold">
                  <span>Login</span>
                </button>
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
