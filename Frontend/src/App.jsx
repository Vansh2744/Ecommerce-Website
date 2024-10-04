import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import WishlistedPage from "./pages/WishlistedPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import { CategoryContextProvider } from "./context/CategoryContextProvider.jsx";

function App() {
  return (
    <div className="mt-40">
      <UserContextProvider>
        <CategoryContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addProducts" element={<AdminPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/wishlist" element={<WishlistedPage />} />
            <Route path="/category" element={<CategoryPage />} />
          </Routes>
          <Footer />
          <Toaster />
        </CategoryContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
