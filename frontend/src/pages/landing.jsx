import { Link } from "react-router-dom";
import "../App.css";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">

      {/* Navbar */}
      <header className="landing-navbar">

        <div className="logo">
          🤖 <span>Nova AI</span>
        </div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>

      </header>

      {/* Hero Section */}
      <section className="hero">

        <h1>Welcome to Nova AI</h1>

        <p>
          Your intelligent AI assistant for coding, learning,
          productivity and daily tasks.
        </p>

        <div className="hero-buttons">

          <Link to="/login">
            <button className="primary-btn">
              Get Started
            </button>
          </Link>

          <Link to="/chat">
            <button className="secondary-btn">
              Continue as Guest
            </button>
          </Link>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <div className="card">
          <h3>🤖 AI Chat</h3>
          <p>Ask anything and get intelligent responses instantly.</p>
        </div>

        <div className="card">
          <h3>📄 Upload Files</h3>
          <p>Upload PDF, DOCX and Images to interact with AI.</p>
        </div>

        <div className="card">
          <h3>🎤 Voice Assistant</h3>
          <p>Talk naturally using speech recognition.</p>
        </div>

        <div className="card">
          <h3>📝 Daily Tasks</h3>
          <p>Create and manage your everyday tasks with AI.</p>
        </div>

      </section>

      {/* Footer */}

      <footer>

        © 2026 Nova AI • Developed by Bhavanasri

      </footer>

    </div>
  );
}

export default Landing;