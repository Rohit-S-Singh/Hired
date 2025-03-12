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

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/user/register", {
                userName: email,
                email: email,
                password: password,
                workExperience: 0,
                havingOffer: false,
            });

            if (response.status === 200 && !response?.data?.errorMessage) {
                toast.success("Registered successfully!");
                setTimeout(() => navigate("/overview"), 2000); // Redirect after 2 seconds
            } else {
                toast.error(response?.data?.errorMessage);
            }
        } catch (error) {
            toast.error("Registration failed!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <span className="text-4xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold">Welcome to Hiredd!</h2>
                <p className="text-gray-500 mt-1 text-sm">
                    Register to create your first account and start exploring new Jobs and getting Hiredd.
                </p>

                <form className="mt-4 text-left" onSubmit={handleRegister}>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 mt-1 border rounded-lg"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="block text-sm font-medium mt-3">Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            className="w-full p-2 mt-1 border rounded-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="absolute right-3 top-3 text-green-500 text-xs">Strong</span>
                    </div>
                    <p className="text-xs text-gray-400">Must be at least 8 characters</p>

                    <label className="block text-sm font-medium mt-3">Select type of your account</label>
                    <div className="flex gap-2 mt-1">
                        <button
                            type="button"
                            className={`flex-1 p-2 rounded-lg border ${
                                accountType === "Mentor Account" ? "bg-orange-100 border-orange-500" : "border-gray-300"
                            }`}
                            onClick={() => setAccountType("Mentor Account")}
                        >
                            Mentor Account
                        </button>
                        <button
                            type="button"
                            className={`flex-1 p-2 rounded-lg border ${
                                accountType === "Personal Account" ? "bg-gray-100 border-gray-500" : "border-gray-300"
                            }`}
                            onClick={() => setAccountType("Personal Account")}
                        >
                            Personal Account
                        </button>
                    </div>

                    <button type="submit" className="w-full mt-4 bg-black text-white p-3 rounded-lg text-lg font-semibold">
                        Register
                    </button>
                </form>

                <div className="relative my-4">
                    <span className="absolute inset-x-0 top-1/2 border-t border-gray-300"></span>
                    <span className="bg-white px-2 relative text-gray-500 text-sm">Or Register with</span>
                </div>

                <div className="flex gap-3 justify-center">
                    <button className="flex items-center gap-2 border p-2 rounded-lg w-full">
                        <FaGoogle className="text-red-500" /> Google
                    </button>
                    <button className="flex items-center gap-2 border p-2 rounded-lg w-full">
                        <FaApple className="text-black" /> Apple ID
                    </button>
                </div>

                <p className="text-gray-500 text-sm mt-4">
                    Already have an account? <span className="text-black font-semibold cursor-pointer">Log In</span>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}
