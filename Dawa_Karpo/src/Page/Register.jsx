import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    phone: "",
    address: "",
    dob: "",
    profile_photo: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "profile_photo") {
      setFormData({ ...formData, profile_photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        data
      );
      alert(res.data.message);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Register</h2>
        <input style={styles.input} name="full_name" placeholder="Full Name" onChange={handleChange} required />
        <input style={styles.input} name="username" placeholder="Username" onChange={handleChange} required />
        <input style={styles.input} name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input style={styles.input} name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input style={styles.input} name="dob" type="date" onChange={handleChange} />
        <textarea style={styles.textarea} name="address" placeholder="Address" onChange={handleChange} />
        
        <input style={styles.input} name="profile_photo" type="file" onChange={handleChange} />

        <button style={styles.button} type="submit">Register</button>

        <Link to="/" style={styles.loginButton}>
          Already have an account? Login
        </Link>
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
    // background: "linear-gradient(135deg, #43cea2, #185a9d)",
  },
  card: {
    width: "380px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#185a9d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  loginButton: {
    display: "block",
    textAlign: "center",
    color: "#185a9d",
    textDecoration: "none",
  },
};

export default Register;
