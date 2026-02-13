import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login/`, {
    username,
    password,
  });
  return response.data;
};
// export const loginUser = async (username, password) => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//       }),
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Login error:", error);
//     return { success: false };
//   }
// };