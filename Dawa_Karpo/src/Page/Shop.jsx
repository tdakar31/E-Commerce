import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeSlider from "./HomeSlider";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  // ------------------ HELPER FUNCTIONS ------------------

  const handleSaveDetails = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            selectedSize: selectedSize,
            quantity: Number(quantity),
          }
        : product
    );

    setProducts(updatedProducts);
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    const finalSize = selectedSize || product.selectedSize;
    const finalQty = quantity || product.quantity || 1;

    if (!finalSize) {
      alert("Please select size first!");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: finalSize,
      quantity: Number(finalQty),
    };

    cartItems.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    navigate("/cart");
  };

  // ------------------ FETCH PRODUCTS ------------------

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((product) => {
          let sizesArray = [];

          if (product.sizes || product.available_sizes) {
            // Prefer `sizes` field if available
            const sizesField = product.sizes || product.available_sizes;
            if (Array.isArray(sizesField)) {
              sizesArray = sizesField;
            } else if (typeof sizesField === "string") {
              try {
                sizesArray = JSON.parse(sizesField);
              } catch {
                // fallback if string is not proper JSON
                sizesArray = sizesField
                  .replace(/[\[\]"]/g, "")
                  .split(",")
                  .map((s) => s.trim());
              }
            }
          }

          return {
            ...product,
            available_sizes: sizesArray.map((s) => String(s).trim()),
          };
        });

        setProducts(formattedData);

        const uniqueCategories = [
          ...new Set(formattedData.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
        setActiveCategory(uniqueCategories[0] || "");
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ------------------ MODAL ------------------

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setSelectedSize(product.selectedSize || "");
    setQuantity(product.quantity || 1);
  };

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div style={{ padding: "60px", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", fontSize: "60px", padding:"50px" }}>Shop</h2>

      <HomeSlider />

      {/* CATEGORY BUTTONS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "40px 0", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 20px",
              background: activeCategory === cat ? "#000" : "#eee",
              color: activeCategory === cat ? "#fff" : "#000",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "30px" }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#f78282",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "10px" }}
            />

            <h3 onClick={() => openModal(product)} style={{ cursor: "pointer", marginTop: "15px" }}>
              {product.name}
            </h3>

            <p style={{ fontWeight: "bold" }}>₹ {product.price}</p>

            {product.selectedSize && (
              <p style={{ fontSize: "13px", color: "#fff", marginBottom: "10px" }}>
                Picked: {product.selectedSize} (Qty: {product.quantity})
              </p>
            )}

            <button
              onClick={() => handleAddToCart(product)}
              style={{ padding: "12px", width: "100%", background: "#000", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ background: "#fff", width: "650px", borderRadius: "20px", padding: "30px", color: "#000" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <h2>{selectedProduct.name}</h2>
                <h3 style={{ color: "#0d6efd" }}>₹ {selectedProduct.price}</h3>
                <p style={{ fontSize: "14px", color: "#666" }}>{selectedProduct.description}</p>
              </div>

              <img
                src={selectedProduct.image}
                alt=""
                style={{ width: "180px", height: "180px", borderRadius: "10px", objectFit: "cover" }}
              />
            </div>

            {/* SIZE SELECT */}
            <div style={{ marginTop: "20px" }}>
              <label style={{ fontWeight: "bold" }}>Choose Size:</label>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ width: "100%", padding: "10px", marginTop: "10px", borderRadius: "8px" }}
              >
                <option value="">Select a Size</option>
                {selectedProduct.available_sizes && selectedProduct.available_sizes.length > 0 ? (
                  selectedProduct.available_sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))
                ) : (
                  <option disabled>No sizes available</option>
                )}
              </select>

              <label style={{ fontWeight: "bold", display: "block", marginTop: "15px" }}>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: "100%", padding: "10px", marginTop: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
                <button
                  onClick={handleSaveDetails}
                  style={{ flex: 1, padding: "12px", background: "#0d6efd", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
                >
                  Save Selection
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedProduct(null);
                  }}
                  style={{ padding: "12px", background: "#eee", border: "none", borderRadius: "8px", cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;