import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../utils/cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Load cart on mount
  useEffect(() => {
    const cartItems = getCart();
    setCart(cartItems);
  }, []);

  // Remove item from cart
  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  // 🟡 Empty Cart View
  if (!cart.length) {
    return (
      <div style={empty.wrapper}>
        <h1 style={empty.title}>🛒 Your Cart is Empty</h1>
        <p style={empty.text}>Add some products to continue shopping</p>
        <Link to="/shop" style={empty.btn}>
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛍️ Your Cart</h1>
      <h3
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "60px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, red, blue)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "blink 1s infinite"
        }}
      >
        Refresh the page to update the card!!
      </h3>

      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            padding: "20px",      // Added padding
            marginBottom: "25px", // Added margin
            borderRadius: "16px",
            background: "#ffffff",
            boxSizing: "border-box",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            alignItems: "center"
          }}
        >
          <img
            src={
              item.image?.startsWith("http")
                ? item.image
                : `http://127.0.0.1:8000${item.image || "/media/default.jpg"}`
            }
            alt="product"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />

          <div style={{ flex: 1, paddingLeft: "10px" }}>
            {/* 🏷️ PRODUCT NAME - Forced Visibility */}
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "800",
                margin: "0 0 10px 0", // Margin bottom for spacing
                padding: "0",
                color: "#1a1a1a",      // Explicit dark color
                display: "block"
              }}
            >
              {item.name || item.title || "Product Name Missing"}
            </h3>
            <p style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#2563eb",
              margin: "5px 0 10px 0"
            }}>
              ₹ {item.price || 0}
            </p>

            {/* ✅ Size & Quantity Box */}
            <div style={{
              background: "#ffffff",
              color: "#000000",
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "15px",
              width: "fit-content"
            }}>
              <div style={{ marginBottom: "6px", fontWeight: "600" }}>
                📏 Size: {item.size || "Not Selected"}
              </div>

              <div style={{ fontWeight: "600" }}>
                🔢 Qty: {item.quantity || 1}
              </div>
            </div>


            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleRemove(item.id)}
                style={{
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                ❌ Remove
              </button>

              <Link
                to="/shop"
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#f3f4f6",
                  color: "#1f2937",
                  fontWeight: "600",
                  textDecoration: "none",
                  border: "1px solid #d1d5db"
                }}
              >
                ➕ Add More
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div style={styles.totalBox}>
        <h2>Total: ₹ {total}</h2>
        <button style={styles.payBtn}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Cart;

/* ================== STYLES ================== */

const styles = {
  page: {
    padding: "140px 30px",
    maxWidth: "900px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "900",
    marginBottom: "40px",
  },
  card: {
    display: "flex",
    gap: "20px",
    padding: "16px",
    marginBottom: "20px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "8px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: "10px",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  removeBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#dc2626",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  addMoreBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
  },
  totalBox: {
    marginTop: "40px",
    padding: "24px",
    borderRadius: "20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1f2937, #2563eb)",
    color: "#fff",
  },
  payBtn: {
    marginTop: "16px",
    padding: "12px 32px",
    fontSize: "16px",
    fontWeight: "800",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    backgroundColor: "#22c55e",
    color: "#fff",
  },
};

const empty = {
  wrapper: {
    padding: "180px 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "34px",
    fontWeight: "900",
  },
  text: {
    fontSize: "16px",
    color: "#6b7280",
    marginTop: "10px",
  },
  btn: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 28px",
    backgroundColor: "#2563eb",
    color: "#fff",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "700",
  },
};
