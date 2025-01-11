import { useState, useContext } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { setCustomer } = useContext(UserContext);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`/api/v1/user/login`, user);

      const curr = await axios.get(`/api/v1/user/getProfile`);
      setCustomer(curr.data.data);
      console.log("Data :", curr);

      console.log(res);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error.message);
    }
  };

  return (
    <div className="mt-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 flex flex-col gap-5 p-20 items-center shadow-lg shadow-gray-700"
      >
        <div className="relative">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            autoComplete="off"
            className="p-2 text-center h-10 text-lg w-96 border border-black rounded-lg focus:outline-none shadow-md focus:shadow-gray-600"
          />
          <Mail className="absolute top-2 left-2" />
        </div>
        <div className="relative">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            autoComplete="off"
            className="p-2 text-center h-10 text-lg w-96 border border-black rounded-lg focus:outline-none shadow-md focus:shadow-gray-600"
          />
          <Lock className="absolute top-2 left-2" />
          {showPassword ? (
            <Eye
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <EyeOff
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-orange-600 p-1 w-40 rounded-lg font-semibold text-lg mt-10 hover:bg-orange-500 hover:ring-2"
        >
          Login
        </button>

        <p>
          Create an account?{" "}
          <Link to="/signup" className="text-red-500 font-semibold">
            signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
