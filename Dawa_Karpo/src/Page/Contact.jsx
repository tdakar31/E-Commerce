import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [contacts, setContacts] = useState([]);

  // ✅ MOVE contactInfo HERE (outside handleSubmit)
  const contactInfo = {
    name: "Tenzin Dakar",
    phone: "+91 9876543210",
    email: "tenzin@example.com",
    address: "123 Tibetan Street, Dharamshala, India",
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contacts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        alert("Message Sent Successfully!");
        setContacts([...contacts, form]); // optional
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "200px 20px 50px 20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
        color: "#333",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Contact Details */}
        <div
          style={{
            padding: "30px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "15px",
            textAlign: "center",
            marginBottom: "50px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>Contact Me</h1>
          <p><strong>Name:</strong> {contactInfo.name}</p>
          <p><strong>Phone:</strong> {contactInfo.phone}</p>
          <p><strong>Email:</strong> {contactInfo.email}</p>
          <p><strong>Address:</strong> {contactInfo.address}</p>
        </div>

        {/* Contact Form */}
        <div
          style={{
            padding: "30px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Send a Message
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                minHeight: "120px",
                border: "1px solid #ccc",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#4facfe",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
