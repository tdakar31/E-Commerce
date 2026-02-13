import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { addToCart } from "../utils/cart";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]); // ✅ Contact messages state

  // ✅ Protect route
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Fetch Latest Products
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/latest-products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch Contact Messages
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/contacts/")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        padding: "200px 30px",
        boxSizing: "border-box",
      }}
    >
      {/* ================= HEADER ================= */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <h2
          style={{
            fontSize: "30px",
            padding: "70px",
            fontWeight: "800",
            color: "#212529",
          }}
        >
          🛍️ Featured Products
        </h2>

        <p
          style={{
            color: "#555",
            fontSize: "40px",
            fontWeight: "500",
          }}
        >
          Discover our latest collections just for you
        </p>

        <p
          style={{
            fontSize: "22px",
            fontWeight: "700",
            marginTop: "10px",
          }}
        >
          <Link to="/shop">--More option--</Link>
        </p>
      </div>

      {/* ================= PRODUCT SLIDER ================= */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "20px auto",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          spaceBetween={16}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    padding: "14px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "160px",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      marginBottom: "6px",
                      color: "black",
                    }}
                  >
                    {product.name}
                  </h5>

                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0d6efd",
                      marginBottom: "10px",
                    }}
                  >
                    ₹ {product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      marginTop: "auto",
                      width: "100%",
                      padding: "10px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#0d6efd",
                      color: "#fff",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= CONTACT MESSAGES SECTION ================= */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "60px auto",
          padding: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "800",
          }}
        >
          💬 Customer Messages
        </h2>

        {messages.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "40px"}}>No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                background: "#ffffff",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h4 style={{ marginBottom: "5px" }}>{msg.name}</h4>

              <p
                style={{
                  color: "#0d6efd",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                {msg.email}
              </p>

              <p style={{ color: "#555" }}>{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
