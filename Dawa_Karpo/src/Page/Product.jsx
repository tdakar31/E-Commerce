import { useEffect, useState } from "react";
import { addToCart } from "../utils/cart";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // BASE URL for your Django media files
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("PRODUCTS RECEIVED 👉", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Updated keys to match "T-Shirt" and "Lower" from your database
  const categories = [
    { key: "shoes", label: "👟 Shoes" },
    { key: "hoodies", label: "🧥 Hoodies" },
    { key: "t-shirt", label: "👕 T-Shirts" }, // Matches "T-Shirt"
    { key: "jacket", label: "🧢 Jackets" },
    { key: "lower", label: "👖 Lowers" },    // Matches "Lower"
  ];

  const cardWrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "18px",
    justifyContent: "center",
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "100px" }}>Loading Products...</div>;
  }

  return (
    <div
      style={{
        padding: "150px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: "38px",
          fontWeight: "900",
          letterSpacing: "1.5px",
          color: "#111827",
        }}
      >
        🛍️ Products
      </h1>

      {categories.map((cat) => {
        // Updated filtering logic to be more robust against spaces and hyphens
        const filteredProducts = products.filter((p) => {
          const productCat = p.category?.toLowerCase().replace(/\s/g, ""); // remove spaces
          const targetCat = cat.key.toLowerCase().replace(/\s/g, "");
          return productCat === targetCat;
        });

        if (filteredProducts.length === 0) return null;

        return (
          <div key={cat.key} style={{ marginBottom: "70px" }}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2
                style={{
                  display: "inline-block",
                  fontSize: "26px",
                  fontWeight: "700",
                  padding: "12px 30px",
                  borderRadius: "30px",
                  background: "linear-gradient(135deg, #1f2937, #2563eb)",
                  color: "#ffffff",
                  boxShadow: "0 6px 15px rgba(37,99,235,0.35)",
                  letterSpacing: "1px",
                }}
              >
                {cat.label}
              </h2>
            </div>

            <div style={cardWrapperStyle}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    width: "220px",
                    borderRadius: "12px",
                    padding: "12px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  {/* IMAGE - Prefixed with BASE_URL */}
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#f9fafb",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`}
                      alt={product.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#111827", marginBottom: "6px" }}>
                    <span style={{ color: "#2563eb" }}>Name:</span> {product.name}
                  </p>

                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#16a34a", marginBottom: "6px" }}>
                    Price: ₹{product.price}
                  </p>

                  <div style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.5" }}>
                    <strong>Details:</strong>
                    <p style={{ margin: "4px 0 0 0", whiteSpace: "pre-line" }}>
                      {product.description}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      marginTop: "12px",
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Add to Cart
                  </button>

                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;