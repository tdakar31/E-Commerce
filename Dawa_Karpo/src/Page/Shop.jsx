import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  // 🔍 SEARCH
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setProducts([]);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/products/?search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  // 🪟 OPEN POPUP
  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setSelectedColor("");
    setSelectedSize("");
    setQuantity(1);
  };

  // 💾 SAVE DETAILS
  const saveDetails = () => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            selectedColor,
            selectedSize,
            quantity,
          }
        : product
    );

    setProducts(updatedProducts);
    setShowModal(false);
  };

  // 🛒 ADD TO CART
  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.push(product);

    localStorage.setItem("cart", JSON.stringify(cartItems));

    navigate("/cart");
  };

  return (
    <div style={{ padding: "60px", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", padding: "45px", margin: "30px",fontSize: "70px",}}>Shop</h2>

      {/* ✅ MESSAGE 1 */}
      <p style={{ textAlign: "center", fontWeight: "bold", marginBottom: "5px", color: "Black" , fontSize: "50px"}}>
        Product options: Tshirt, Shoes, Lower, Jackets, Hoodies
      </p>

      {/* ✅ MESSAGE 2 */}
      <p style={{ textAlign: "center", color: "#000000", marginBottom: "40px" , fontSize: "50px"}}>
        Search product to see the product.
      </p>

      {/* SEARCH */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "40px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "50%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "14px 30px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "15px"
              }}
            />

            {/* PRODUCT NAME */}
            <h3
              onClick={() => openModal(product)}
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#111",
                cursor: "pointer",
                marginBottom: "8px"
              }}
            >
              {product.name}
            </h3>

            {/* PRODUCT PRICE */}
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
              ₹ {product.price}
            </p>

            {/* SHOW SAVED DETAILS */}
            {product.selectedColor && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  background: "#ff4040",
                  borderRadius: "10px",
                  fontSize: "24px"
                }}
              >
                <p>🎨 Color: {product.selectedColor}</p>
                <p>📏 Size: {product.selectedSize}</p>
                <p>🔢 Qty: {product.quantity}</p>
              </div>
            )}

            {/* ADD TO CART BUTTON */}
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                marginTop: "15px",
                padding: "10px",
                width: "100%",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "15px",
              width: "400px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
              Customize Product
            </h3>

            <label>Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px" }}
            >
              <option value="">Select Color</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Black</option>
            </select>

            <label>Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px" }}
            >
              <option value="">Select Size</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>

            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "8px" }}
            />

            <button
              onClick={saveDetails}
              style={{
                width: "100%",
                padding: "12px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Save Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;












