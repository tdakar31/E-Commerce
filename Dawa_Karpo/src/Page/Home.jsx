import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { addToCart } from "../utils/cart";
import HomeSlider from "./HomeSlider";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [savedDetails, setSavedDetails] = useState({});

  // Protect route
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/latest-products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch messages
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/contacts/")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ SAFE JSON PARSER (NEW - IMPORTANT)
  const getParsedSizes = (product) => {
    if (!product?.sizes) return [];

    if (Array.isArray(product.sizes)) {
      return product.sizes;
    }

    try {
      return JSON.parse(product.sizes);
    } catch {
      return [];
    }
  };

  // Dynamic size options
  const getAllSizes = (product) => {
    if (!product) return [];
    if (product.category?.toLowerCase() === "shoes") {
      return ["7", "8", "9", "10"];
    } else {
      return ["S", "M", "L", "XL", "XXL", "XXXL"];
    }
  };

  const handleSaveDetails = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    setSavedDetails({
      ...savedDetails,
      [selectedProduct.id]: {
        size: selectedSize,
        quantity: quantity,
      },
    });

    setSelectedProduct(null);
    setSelectedSize("");
    setQuantity(1);
  };

  return (
    <>
      <HomeSlider />

      <div style={{ width: "100%", padding: "200px 30px" }}>
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h2 style={{ fontSize: "30px", fontWeight: "800" }}>
            🛍️ Featured Products
          </h2>
          <p style={{ fontSize: "22px", fontWeight: "700" }}>
            <Link to="/shop">--More option--</Link>
          </p>
        </div>

        <div style={{ maxWidth: "1200px", margin: "auto" }}>
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
                    background: "#fff",
                    borderRadius: "14px",
                    padding: "15px",
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
                      borderRadius: "10px",
                    }}
                  />

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "160px",
                    }}
                  >
                    <h5
                      onClick={() => setSelectedProduct(product)}
                      style={{
                        cursor: "pointer",
                        fontWeight: "700",
                        color: "#000",
                      }}
                    >
                      {product.name}
                    </h5>

                    <p style={{ color: "#0d6efd", fontWeight: "700" }}>
                      ₹ {product.price}
                    </p>

                    {savedDetails[product.id] && (
                      <div style={{ marginBottom: "8px", color: "#555" }}>
                        <p>Size: {savedDetails[product.id].size}</p>
                        <p>Qty: {savedDetails[product.id].quantity}</p>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (!savedDetails[product.id]) {
                          alert("Please select details first");
                          return;
                        }

                        const productData = {
                          ...product,
                          ...savedDetails[product.id],
                        };

                        addToCart(productData);
                        navigate("/cart");
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: "#0d6efd",
                        color: "#fff",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "auto",
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

        {/* POPUP */}
        {selectedProduct && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                background: "linear-gradient(to right, #ffffff, #e6ecff)",
                width: "700px",
                borderRadius: "18px",
                padding: "30px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", gap: "25px" }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontWeight: "800" }}>
                    {selectedProduct.name}
                  </h2>

                  <h3 style={{ color: "#0d6efd", fontWeight: "700" }}>
                    ₹ {selectedProduct.price}
                  </h3>

                  <div
                    style={{
                      marginTop: "15px",
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.6",
                    }}
                  >
                    {selectedProduct.description}
                  </div>
                </div>

                <div>
                  <img
                    src={`http://127.0.0.1:8000${selectedProduct.image}`}
                    alt={selectedProduct.name}
                    style={{
                      width: "220px",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </div>

              {/* SIZE */}
              <div style={{ marginTop: "25px" }}>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ fontWeight: "600" }}>Select Size:</label>

                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginTop: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="">Choose Size</option>

                    {getAllSizes(selectedProduct).map((size) => {
                      const availableSizes =
                        getParsedSizes(selectedProduct);

                      const isAvailable =
                        availableSizes.includes(size);

                      return (
                        <option
                          key={size}
                          value={size}
                          disabled={!isAvailable}
                        >
                          {size} {!isAvailable ? "(Out of Stock)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontWeight: "600" }}>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginTop: "5px",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={handleSaveDetails}
                    style={{
                      padding: "10px 20px",
                      background: "#0d6efd",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Save Details
                  </button>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    style={{
                      padding: "10px 20px",
                      background: "gray",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;