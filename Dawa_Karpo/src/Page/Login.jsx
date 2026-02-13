// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../Services/auth";

// const Login = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = await loginUser(identifier, password);

//       // If the backend returns success: True
//       if (data.success) {
//         alert(`Welcome back, ${data.username}! ✅`);

//         // Optional: Save user info to LocalStorage so they stay logged in
//         localStorage.setItem("user", JSON.stringify(data));

//         // Redirect to Home Page
//         navigate("/"); 
//       }
//     } catch (error) {
//       // If backend returns 401 or 404, Axios throws an error
//       const errorMsg = error.response?.data?.message || "Invalid login credentials ❌";
//       alert(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.glassCard}>
//         <form onSubmit={handleSubmit}>
//           <h2 style={styles.title}>Clothing Store Login</h2>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Email or Username</label>
//             <input
//               style={styles.input}
//               type="text"
//               placeholder="Enter Email or Username"
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//               required
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <input
//               style={styles.input}
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button 
//             style={{...styles.button, opacity: loading ? 0.7 : 1}} 
//             type="submit" 
//             disabled={loading}
//           >
//             {loading ? "Checking Database..." : "Login"}
//           </button>

//           <div style={styles.options}>
//             <Link to="/register" style={styles.link}>New User? Register</Link>
//             <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(45deg, #0f2027, #203a43, #2c5364)",
//     padding: "20px",
//   },
//   glassCard: {
//     width: "100%",
//     maxWidth: "400px",
//     padding: "40px",
//     backgroundColor: "rgba(255, 255, 255, 0.98)",
//     borderRadius: "15px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//   },
//   title: { textAlign: "center", marginBottom: "25px", color: "#222" },
//   inputGroup: { marginBottom: "15px" },
//   label: { display: "block", marginBottom: "5px", fontSize: "12px", fontWeight: "bold", color: "#555" },
//   input: {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     boxSizing: "border-box",
//     fontSize: "14px",
//   },
//   button: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#2c5364",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "16px",
//     marginTop: "10px",
//   },
//   options: { marginTop: "20px", display: "flex", justifyContent: "space-between" },
//   link: { textDecoration: "none", color: "#2c5364", fontSize: "13px" },
// };

// export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Services/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);

      if (response.success) {
        // ✅ Save user in localStorage
        localStorage.setItem("user", response.username);
        localStorage.setItem("profile_image", response.profile_image);
        // ✅ Redirect to home page
        navigate("/home");
      } else {
        alert(response.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Login
        </button>

        {/* 🔗 Links */}
        <div style={styles.links}>
          <Link to="/register" style={styles.link}>
            Create New Account
          </Link>

          <Link to="/forgot-password" style={styles.link}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: "linear-gradient(135deg, #1f2937, #2563eb)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: "360px",
    padding: "35px",
    backgroundColor: "#fff",
    borderRadius: "14px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    textAlign: "center",
  },
  title: {
    marginBottom: "8px",
    fontSize: "26px",
    fontWeight: "700",
  },
  subtitle: {
    marginBottom: "25px",
    fontSize: "14px",
    color: "#777",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  links: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    fontSize: "14px",
    color: "#667eea",
    fontWeight: "500",
  },
};

export default Login;
