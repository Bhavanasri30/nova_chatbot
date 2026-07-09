import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    // Backend connection later
    navigate("/chat");
  };

  return (
    <div className="signup-container">

      <div className="signup-card">

        <h1>🤖 Nova AI</h1>

        <h2>Create Your Account</h2>

        <p>Join Nova AI and start your AI journey.</p>

        <form onSubmit={handleSignup}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            required
          />

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
              placeholder="Create password"
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>

          </div>

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm password"
            required
          />

          <button className="signup-btn">
            Create Account
          </button>

        </form>

        <p className="login-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;