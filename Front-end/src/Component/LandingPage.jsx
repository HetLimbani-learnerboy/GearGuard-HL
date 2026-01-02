import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPageStyle.css";
import gearLogo from "../assets/GearGuard-img.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav className="navbar">
        <h1 className="logo">GearGuard</h1>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <button
            className="nav-btn"
            onClick={() => navigate("/loginpage")}
          >
            Sign In
          </button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h2 className="hero-title">
            Smart Maintenance.
            <br />
            <span>Zero Downtime.</span>
          </h2>
          <p className="hero-description">
            GearGuard helps organizations track equipment, manage maintenance
            requests, and automate workflows — all in one powerful platform.
          </p>
          <button
            className="primary-btn"
            onClick={() => navigate("/signuppage")}
          >
            Get Started
          </button>
        </div>

        <div className="hero-image-side">
          <img src={gearLogo} alt="GearGuard Asset" className="hero-asset" />
        </div>
      </header>

      <section className="features" id="features">
        <h3 className="section-title">Why GearGuard?</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon-circle">01</div>
            <h4>Equipment Tracking</h4>
            <p>Centralized asset management with ownership and location.</p>
          </div>
          <div className="feature-card">
            <div className="icon-circle">02</div>
            <h4>Kanban Workflow</h4>
            <p>Visual drag-and-drop lifecycle management.</p>
          </div>
          <div className="feature-card">
            <div className="icon-circle">03</div>
            <h4>Preventive Scheduling</h4>
            <p>Calendar-based routine maintenance planning.</p>
          </div>
          <div className="feature-card">
            <div className="icon-circle">04</div>
            <h4>Smart Automation</h4>
            <p>Auto-assign technicians intelligently.</p>
          </div>
        </div>
      </section>

      <section className="workflow" id="workflow">
        <h3 className="section-title">How It Works</h3>

        <div className="workflow-steps">
          <div className="step">
            <span className="step-num">1</span>
            <h4>Register Equipment</h4>
            <p>Add machines with details like type, location, and warranty.</p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="step">
            <span className="step-num">2</span>
            <h4>Create Request</h4>
            <p>Log maintenance issues or service needs instantly.</p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="step">
            <span className="step-num">3</span>
            <h4>Assign Technician</h4>
            <p>System assigns the right technician based on skills.</p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="step">
            <span className="step-num">4</span>
            <h4>Track & Close</h4>
            <p>Monitor progress and close tasks with full history.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 GearGuard | Predictive Maintenance Platform</p>
      </footer>
    </div>
  );
};

export default LandingPage;
