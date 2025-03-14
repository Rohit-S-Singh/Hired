import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(process.env.REACT_APP_BACKEND_BASE_URL)
        const requestBody = { email, password };
        const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/user/login`;
        try {
            const response = await axios.post(url, requestBody);
            
            if (response.data.mainCode !== 200) {
                toast.error("Login failed! Invalid credentials.");
            } else {
                setLoggedIn(true);
                localStorage.setItem("jwtToken", response.data.token);
                localStorage.setItem("email", response.data.email);
                toast.success("Login successful!");

                setTimeout(() => navigate("/overview"), 2000);
            }
        } catch (error) {
            toast.error("Error during login!");
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                    <span className="text-3xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>
                <p className="text-center text-gray-600 text-sm">Log in to continue exploring new jobs and opportunities.</p>
                <form onSubmit={handleLogin} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                <div className="flex gap-2">
                    <button className="w-1/2 flex items-center justify-center gap-2 border py-2 rounded-lg">
                        <span>🔴</span> Google
                    </button>
                    <button className="w-1/2 flex items-center justify-center gap-2 border py-2 rounded-lg">
                        <span>🍏</span> Apple ID
                    </button>
                </div>
                <p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account? <span className="text-black font-medium cursor-pointer" onClick={() => navigate("/register")} >Register</span>
                </p>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
