import React,{useState} from 'react';
import axios from 'axios';
import './Login.css'


const Login = (props) => {
    const {
        setLoggedIn
    } = props;
    const [userName,setUserName] = useState();
    const [password,setPassword] = useState();

    const handleLogin = (event) => {
        event.preventDefault();
        const requestBody = {
            userName: userName, // Use variables directly
            password: password
        };
        const url = "http://localhost:8080/user/login";
        
        axios.post(url, requestBody)
            .then(response => {
                // Assuming the mainCode and other details are in response.data
                if (response.data.mainCode !== 200) {
                    // Display error snackbar
                    console.log("login failed");
                } else {
                    setLoggedIn(true);
                    localStorage.setItem("jwtToken", response.data.token);
                    localStorage.setItem("userName", response.data.userName);
                    localStorage.setItem("roles", response.data.roles);
                    localStorage.setItem("email", response.data.email);
                    console.log("login successful");
                    // Display snackbar for successfully logging in
                }
            })
            .catch(error => {
                console.error("Error during login:", error); // Log error
            });
    };
    
    

    const handleRegister = () => {
        // Logic for registration or redirect to registration page
        console.log('Redirect to register');
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
              <button type="button" className="register-btn" onClick={handleRegister}>Register</button>
            </div>
          </form>
        </div>
      ); 
}

export default Login;