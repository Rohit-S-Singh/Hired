import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = (props) => {
    const { setLoggedIn } = props;
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const requestBody = {
            userName: userName,
            password: password,
        };
        const url = "http://localhost:8080/user/login";

        try {
            const response = await axios.post(url, requestBody);

            if (response.data.mainCode !== 200) {
                toast.error("Login failed! Invalid credentials.");
            } else {
                setLoggedIn(true);
                localStorage.setItem("jwtToken", response.data.token);
                localStorage.setItem("userName", response.data.userName);
                localStorage.setItem("roles", response.data.roles);
                localStorage.setItem("email", response.data.email);
                toast.success("Login successful!");

                // Redirect to /overview after a short delay
                setTimeout(() => navigate("/overview"), 2000);
            }
        } catch (error) {
            toast.error("Error during login!");
            console.error("Error during login:", error);
        }
    };

    const handleRegister = () => {
        toast.info("Redirecting to register...");
        navigate("/register"); // Change this to your actual register route
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>

                <div className="input-container">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="button-container">
                    <button type="submit" className="login-btn">Login</button>
                    <button type="button" className="register-btn" onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
