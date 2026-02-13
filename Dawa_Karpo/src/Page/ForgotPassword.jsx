import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    // Logic remains identical
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setSuccess(false);
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/reset-password/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    newPassword: newPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setMessage(data.message);
                
                // Form Refresh Logic
                setUsername("");
                setNewPassword("");
                setConfirmPassword("");

                // Optional: Clear success message after 5 seconds
                setTimeout(() => setMessage(""), 5000);
            } else {
                setSuccess(false);
                setMessage(data.message);
            }
        } catch (err) {
            setSuccess(false);
            setMessage("Connection failed. Ensure Django server is running.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.glassCard}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.title}>Reset Password</h2>
                    <p style={styles.subtitle}>Enter your details to secure your account</p>
                    
                    {message && (
                        <div style={{
                            ...styles.messageBox,
                            backgroundColor: success ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                            color: success ? "#2e7d32" : "#d32f2f",
                            border: `1px solid ${success ? "#4caf50" : "#f44336"}`
                        }}>
                            {message}
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            style={styles.input}
                            type="text"
                            placeholder="e.g. Sonam66"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>New Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button 
                        style={styles.button} 
                        type="submit"
                        onMouseOver={(e) => e.target.style.filter = "brightness(1.1)"}
                        onMouseOut={(e) => e.target.style.filter = "brightness(1.0)"}
                    >
                        Update Password
                    </button>

                    <div style={styles.backWrapper}>
                        <Link to="/" style={styles.link}>
                            ← Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)", // Dark professional gradient
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "20px",
    },
    glassCard: {
        width: "100%",
        maxWidth: "420px",
        padding: "40px",
        backgroundColor: "rgba(240, 136, 136, 0.95)",
        borderRadius: "20px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
    },
    title: {
        textAlign: "center",
        margin: "0 0 10px 0",
        color: "#1a1a1a",
        fontSize: "28px",
        fontWeight: "700",
    },
    subtitle: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: "14px",
        marginBottom: "30px",
    },
    messageBox: {
        padding: "12px",
        borderRadius: "8px",
        textAlign: "center",
        fontSize: "14px",
        marginBottom: "20px",
        transition: "all 0.3s ease",
    },
    inputGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#ffffff",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    input: {
        width: "100%",
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid #000000",
        fontSize: "15px",
        outline: "none",
        transition: "border-color 0.2s",
        boxSizing: "border-box",
        backgroundColor: "#5b43ab",
    },
    button: {
        width: "100%",
        padding: "15px",
        backgroundColor: "#87a7b4",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        marginTop: "10px",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 15px rgba(44, 83, 100, 0.3)",
    },
    backWrapper: {
        marginTop: "25px",
        textAlign: "center",
    },
    link: {
        color: "#2c5364",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
        transition: "color 0.2s",
    },
};

export default ForgotPassword;