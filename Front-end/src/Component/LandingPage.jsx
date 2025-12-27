import "./LandingPageStyle.css";

export default function LandingPage() {
  const heroStyle = {
    backgroundImage: `
      linear-gradient(
        rgba(11, 18, 32, 0.88),
        rgba(11, 18, 32, 0.88)
      ),
      url("/assets/GearGuard-img.png")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="landing">
      <nav className="navbar">
        <h1 className="logo">GearGuard</h1>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <button className="nav-btn">Sign In</button>
        </div>
      </nav>

      <section className="hero" style={heroStyle}>
        <div className="hero-content">
          <h2>
            Smart Maintenance.
            <br />
            Zero Downtime.
          </h2>
          <p>
            GearGuard helps organizations track equipment, manage maintenance
            requests, and automate workflows — all in one powerful platform.
          </p>
          <button className="primary-btn">Sign Up</button>
        </div>
      </section>

      <section className="features" id="features">
        <h3>Why GearGuard?</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <h4>Equipment Tracking</h4>
            <p>Centralized asset management with ownership and location.</p>
          </div>
          <div className="feature-card">
            <h4>Kanban Workflow</h4>
            <p>Visual drag-and-drop lifecycle management.</p>
          </div>
          <div className="feature-card">
            <h4>Preventive Scheduling</h4>
            <p>Calendar-based routine maintenance planning.</p>
          </div>
          <div className="feature-card">
            <h4>Smart Automation</h4>
            <p>Auto-assign technicians intelligently.</p>
          </div>
        </div>
      </section>

      <section className="workflow" id="workflow">
        <h3>How It Works</h3>
        <div className="workflow-steps">
          <div className="step">Register Equipment</div>
          <div className="step">Create Request</div>
          <div className="step">Assign Technician</div>
          <div className="step">Track & Close</div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 GearGuard | Hackathon Project</p>
      </footer>
    </div>
  );
}
