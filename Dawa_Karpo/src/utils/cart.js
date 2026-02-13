// src/utils/cart.js

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const addToCart = (product) => {
  const cart = getCart();

  // prevent duplicate products
  const exists = cart.find((item) => item.id === product.id);
  if (exists) return;

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  // notify navbar & cart
  window.dispatchEvent(new Event("cartUpdated"));
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

