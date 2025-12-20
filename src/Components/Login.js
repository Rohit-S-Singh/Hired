import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { useGlobalContext } from "../pages/AUTH/GlobalContext";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

  // ======================================================
  // 🔐 AUTO VERIFY JWT ON LOGIN PAGE MOUNT
  // ======================================================
  useEffect(() => {
    const autoVerify = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setCheckingSession(false);
        return;
      }

      try {
        const res = await axios.post(
          `${BASE_URL}/api/verifytoken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success && res.data.user) {
          // ✅ Auto-login
          setIsLoggedIn(true);
          setUser(res.data.user);
          navigate("/overview", { replace: true });
        } else {
          localStorage.removeItem("jwtToken");
        }
      } catch (err) {
        localStorage.removeItem("jwtToken");
      } finally {
        setCheckingSession(false);
      }
    };

    autoVerify();
  }, [navigate, setIsLoggedIn, setUser, BASE_URL]);



  // ======================================================
  // 🔐 NORMAL EMAIL/PASSWORD LOGIN
  // ======================================================
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        { email: userName, password }
      );

      const { token, user } = response.data;

      localStorage.setItem("jwtToken", token);
      setIsLoggedIn(true);
      setUser(user);

      toast.success("Login successful!");
      setTimeout(() => navigate("/overview"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.errorMessage || "Login failed");
    }
  };

  // ======================================================
  // 🔐 GOOGLE LOGIN
  // ======================================================
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      const response = await axios.post(
        `${BASE_URL}/api/oauth2/callback`,
        { token: idToken }
      );

      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);

        setIsLoggedIn(true);
        setUser({
          email: response.data.email,
          picture: response.data.avatar,
          name: response.data.username,
        });

        toast.success("Google login successful!");
        setTimeout(() => navigate("/overview"), 1500);
      } else {
        toast.error("Google login failed!");
      }
    } catch (error) {
      toast.error("Google login error!");
    }
  };

  // ======================================================
  // ⏳ SHOW LOADER WHILE CHECKING SESSION
  // ======================================================
  if (checkingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Checking session...</p>
      </div>
    );
  }

  // ======================================================
  // 🧾 LOGIN UI
  // ======================================================
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center mb-4">
            <span className="text-3xl">✅</span>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome Back!
          </h2>

          <p className="text-center text-gray-600 text-sm">
            Log in to continue exploring new jobs and opportunities.
          </p>

          <form onSubmit={handleLogin} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-2 text-gray-500 text-sm">Or log in with</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed!")}
            />
          </div>

          <p className="text-center text-gray-600 text-sm mt-4">
            Don&apos;t have an account?{" "}
            <span
              className="text-black font-medium cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>

          <ToastContainer />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
