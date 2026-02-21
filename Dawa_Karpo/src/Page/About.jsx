import React, { useEffect, useState } from "react";

const About = () => {
  const [visible, setVisible] = useState(false);

  // Animated Counters State
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 200);

    // Counter Animation
    let orderTarget = 1200;
    let customerTarget = 850;
    let productTarget = 320;

    let interval = setInterval(() => {
      setOrders((prev) => (prev < orderTarget ? prev + 20 : orderTarget));
      setCustomers((prev) =>
        prev < customerTarget ? prev + 15 : customerTarget
      );
      setProducts((prev) =>
        prev < productTarget ? prev + 5 : productTarget
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff, #fdf2f8)",
        padding: "80px 20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "60px",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          transform: visible ? "translateY(0)" : "translateY(40px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.8s ease",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "20px",
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Our Store
        </h1>

        {/* Intro */}
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#555",
            lineHeight: "1.8",
            marginBottom: "50px",
          }}
        >
          We are committed to delivering high-quality products with a seamless,
          secure, and modern online shopping experience. Our platform combines
          innovation, reliability, and customer satisfaction to create a
          trusted digital marketplace.
        </p>

        {/* Mission & Vision */}
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ marginBottom: "10px", color: "#111" }}>
            🎯 Our Mission
          </h2>
          <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "20px" }}>
            To provide premium products at affordable prices while ensuring a
            smooth and transparent customer experience.
          </p>

          <h2 style={{ marginBottom: "10px", color: "#111" }}>
            🚀 Our Vision
          </h2>
          <p style={{ color: "#555", lineHeight: "1.7" }}>
            To become a trusted and innovative online store that builds
            long-term relationships with customers.
          </p>
        </div>

        {/* Animated Counters */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          <div style={{ margin: "20px" }}>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {orders}+
            </h2>
            <p style={{ color: "#555", fontSize: "18px" }}>
              Orders Completed
            </p>
          </div>

          <div style={{ margin: "20px" }}>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {customers}+
            </h2>
            <p style={{ color: "#555", fontSize: "18px" }}>
              Happy Customers
            </p>
          </div>

          <div style={{ margin: "20px" }}>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {products}+
            </h2>
            <p style={{ color: "#555", fontSize: "18px" }}>
              Products Available
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "40px",
            marginBottom: "50px",
          }}
        >
          <div style={{ flex: "1 1 300px", textAlign: "center" }}>
            <img
              src="/founder.jpg"
              alt="Tenzin Dakar"
              style={{
                width: "260px",
                height: "260px",
                objectFit: "cover",
                borderRadius: "50%",
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>

          <div style={{ flex: "2 1 500px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
              Founder & Developer
            </h2>

            <h3
              style={{
                fontSize: "24px",
                marginBottom: "15px",
                background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tenzin Dakar
            </h3>

            <p style={{ color: "#555", lineHeight: "1.8" }}>
              Tenzin Dakar is a passionate web developer with a strong
              background in computer science and digital design. He specializes
              in building scalable, secure, and user-friendly web applications
              using modern technologies.
            </p>

            <p style={{ color: "#555", lineHeight: "1.8", marginTop: "15px" }}>
              His goal is to create meaningful digital experiences that combine
              performance, innovation, and aesthetics.
            </p>
          </div>
        </div>

        {/* Highlight Card */}
        <div
          style={{
            padding: "30px",
            borderRadius: "15px",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "white",
            textAlign: "center",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.03)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <h2 style={{ marginBottom: "10px" }}>Leadership & Innovation</h2>
          <p style={{ lineHeight: "1.7", fontSize: "16px" }}>
            Under the leadership of Tenzin Dakar, our store continues to grow
            with a focus on customer trust, modern design, and technological
            excellence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
