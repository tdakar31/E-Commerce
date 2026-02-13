import { Link } from "react-router-dom";

const Footer = () => {
  const footerStyle = {
    width: "100%",
    backgroundColor: "#111827",
    color: "#D1D5DB",
    marginTop: "auto", // Ensures footer sticks to bottom if page is short
  };

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "flex",
    flexWrap: "wrap", // Allows columns to stack on mobile
    justifyContent: "space-between",
    gap: "30px",
    boxSizing: "border-box",
  };

  const columnStyle = {
    flex: "1 1 250px", // Allows columns to grow/shrink but not get too small
  };

  const headingStyle = {
    color: "#FFFFFF",
    fontSize: "1.25rem",
    marginBottom: "1rem",
  };

  const linkStyle = {
    color: "#9CA3AF",
    textDecoration: "none",
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9rem"
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* About Section */}
        <div style={columnStyle}>
          <h2 style={headingStyle}>Tenzin Dakar</h2>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
            Full-stack developer specialized in React and Django. 
            Passionate about building intuitive and high-performance web solutions.
          </p>
        </div>

        {/* Navigation Section */}
        <div style={columnStyle}>
          <h2 style={headingStyle}>Quick Links</h2>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
          <Link to="/shop" style={linkStyle}>Shop</Link>
        </div>

        {/* Social Section */}
        <div style={columnStyle}>
          <h2 style={headingStyle}>Connect</h2>
          <a href="https://github.com/tdakar31" target="_blank" rel="noreferrer" style={linkStyle}>GitHub</a>
          <a href="#" style={linkStyle}>LinkedIn</a>
          <a href="mailto:tenzin@example.com" style={linkStyle}>Email Me</a>
        </div>
      </div>

      <div style={{ 
        width: "100%", 
        borderTop: "1px solid #374151", 
        textAlign: "center", 
        padding: "20px", 
        fontSize: "0.8rem" 
      }}>
        © {new Date().getFullYear()} Tenzin Dakar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;