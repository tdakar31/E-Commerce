import { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/products/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Product added successfully ✅");
        window.location.reload();
      } else {
        alert("Failed to add product ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "200px 20px",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          backgroundColor: "#1d8681",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "25px" }}>
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            style={inputStyle}
          />

          {/* 🔹 CATEGORY DROPDOWN */}
          <select
            name="category"
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">Select Category</option>
            <option value="shoes">Shoes</option>
            <option value="lower">Lower</option>
            <option value="hoodies">Hoodies</option>
            <option value="jacket">Jacket</option>
            <option value="t-shirt">T-Shirt</option>
          </select>

          <textarea
            name="description"
            placeholder="Product Description"
            rows={4}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
};

export default AddProduct;
