// import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000";

// export const addToCart = async (product) => {
//   try {
//     await axios.post(`${API_BASE}/add-to-cart/`, {
//       product: product.id,
//       size: product.size,
//       quantity: product.quantity,
//     });

//     window.dispatchEvent(new Event("cartUpdated"));
//   } catch (error) {
//     console.error("Add to cart error:", error.response?.data || error);
//     alert("Failed to add product to cart");
//   }
// };

import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

// ✅ Add item
export const addToCart = async (product) => {
  try {
    await axios.post(`${API_BASE}/add-to-cart/`, {
      product: product.id,
      size: product.size,
      quantity: product.quantity,
    });

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Add to cart error:", error.response?.data || error);
  }
};

// ✅ Get cart
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_BASE}/cart/`);
    return response.data;
  } catch (error) {
    console.error("Get cart error:", error.response?.data || error);
    return [];
  }
};

// ✅ Remove item
export const removeFromCart = async (id) => {
  try {
    await axios.delete(`${API_BASE}/cart/${id}/`);
    // window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Remove error:", error);
  }
};