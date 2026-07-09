import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Backend connection will be added later
    navigate("/chat");
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>🤖 Nova AI</h1>

        <h2>Welcome Back</h2>

        <p>Sign in to continue your AI journey</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>

          </div>

          <div className="login-options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="#">Forgot Password?</a>

          </div>

          <button className="login-btn">
            Login
          </button>

        </form>

        <button
          className="guest-btn"
          onClick={() => navigate("/chat")}
        >
          Continue as Guest
        </button>

        <p className="signup-text">

          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;