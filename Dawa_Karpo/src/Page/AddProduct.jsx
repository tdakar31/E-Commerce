import { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
    sizes: [],
  });

  // Handle normal inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "category") {
      setFormData({
        ...formData,
        category: value,
        sizes: [], // reset sizes when category changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }
  };

  // Handle size checkbox
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((size) => size !== value),
      }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "sizes") {
        data.append("sizes", JSON.stringify(formData.sizes));
      } else {
        data.append(key, formData[key]);
      }
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

  const shoeSizes = ["7","8", "9", "10"];
  const clothSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const selectedSizes =
    formData.category === "shoes" ? shoeSizes : clothSizes;

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
        <h2
          style={{
            textAlign: "center",
            color: "#fff",
            marginBottom: "25px",
          }}
        >
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Category</option>
            <option value="shoes">Shoes</option>
            <option value="lower">Lower</option>
            <option value="hoodies">Hoodies</option>
            <option value="jacket">Jacket</option>
            <option value="t-shirt">T-Shirt</option>
          </select>

          {/* SIZE SECTION */}
          {formData.category !== "" && (
            <div
              style={{
                background: "#ffffff",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#1d8681",
                }}
              >
                {formData.category === "shoes"
                  ? "Select Shoe Sizes"
                  : "Select Clothing Sizes"}
              </label>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {selectedSizes.map((size) => (
                  <label
                    key={size}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "#0a0a0a",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.sizes.includes(size)}
                      onChange={handleSizeChange}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          )}

          <textarea
            name="description"
            placeholder="Product Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
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