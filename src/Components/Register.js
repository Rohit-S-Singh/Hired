import { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("Mentor Account");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔐 Basic validation
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!process.env.REACT_APP_BACKEND_BASE_URL) {
      toast.error("Backend URL not configured");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/register`,
        {
          userName: email.split("@")[0],
          email,
          password,
          accountType
        }
      );

      if (response.status === 200 && !response?.data?.errorMessage) {
        toast.success("Registered successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response?.data?.errorMessage || "Registration failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.errorMessage || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        
        {/* Header */}
        <div className="flex justify-center mb-4">
          <span className="text-4xl">✅</span>
        </div>

        <h2 className="text-2xl font-bold">Welcome to Hiredd!</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Register to create your account and start exploring new jobs.
        </p>

        {/* Form */}
        <form className="mt-4 text-left" onSubmit={handleRegister}>
          {/* Email */}
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="block text-sm font-medium mt-3">Password</label>
          <input
            type="password"
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">
            Must be at least 8 characters
          </p>

          {/* Account Type */}
          <label className="block text-sm font-medium mt-3">
            Select account type
          </label>
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              className={`flex-1 p-2 rounded-lg border transition ${
                accountType === "Mentor Account"
                  ? "bg-orange-100 border-orange-500"
                  : "border-gray-300"
              }`}
              onClick={() => setAccountType("Mentor Account")}
            >
              Mentor Account
            </button>

            <button
              type="button"
              className={`flex-1 p-2 rounded-lg border transition ${
                accountType === "Personal Account"
                  ? "bg-gray-100 border-gray-500"
                  : "border-gray-300"
              }`}
              onClick={() => setAccountType("Personal Account")}
            >
              Personal Account
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 p-3 rounded-lg text-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <span className="absolute inset-x-0 top-1/2 border-t border-gray-300"></span>
          <span className="bg-white px-2 relative text-gray-500 text-sm">
            Or Register with
          </span>
        </div>

        {/* Social Login (Placeholder) */}
        <div className="flex gap-3">
          <button
            onClick={() => toast.info("Google signup coming soon")}
            className="flex items-center justify-center gap-2 border p-2 rounded-lg w-full hover:bg-gray-50"
          >
            <FaGoogle className="text-red-500" /> Google
          </button>

          <button
            onClick={() => toast.info("Apple signup coming soon")}
            className="flex items-center justify-center gap-2 border p-2 rounded-lg w-full hover:bg-gray-50"
          >
            <FaApple className="text-black" /> Apple ID
          </button>
        </div>

        {/* Login Redirect */}
        <p className="text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-black font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
