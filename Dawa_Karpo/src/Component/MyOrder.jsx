// import { useEffect, useState } from "react";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/my-orders/", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => setOrders(data));
//   }, []);

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2
//         style={{
//           fontSize: "24px",
//           fontWeight: "700",
//           marginBottom: "25px",
//           color: "#333"
//         }}
//       >
//         My Orders
//       </h2>

//       {orders.length === 0 ? (
//         <p style={{ fontSize: "16px", color: "#777" }}>
//           No orders found.
//         </p>
//       ) : (
//         orders.map(order => (
//           <div
//             key={order.id}
//             style={{
//               padding: "20px",
//               marginBottom: "20px",
//               borderRadius: "10px",
//               backgroundColor: "#ffffff",
//               boxShadow: "0 6px 15px rgba(0,0,0,0.07)",
//               borderLeft: "5px solid #2563eb"
//             }}
//           >
//             <p><strong>Order ID:</strong> {order.id}</p>
//             <p><strong>Total:</strong> ₹{order.total_price}</p>
//             <p><strong>Status:</strong> {order.status}</p>
//             <p><strong>Date:</strong> {order.created_at}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyOrders;

import { useEffect, useState } from "react";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/my-orders/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "120px 20px",
        backgroundColor: "#f4f6f9",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          📦 My Orders
        </h2>

        {orders.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            No orders found.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: "#ffffff",
                padding: "25px",
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "0.3s",
              }}
            >
              <p style={{ marginBottom: "8px" }}>
                <strong>Product:</strong> {order.product_name}
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "20px",
                    backgroundColor:
                      order.status === "Delivered"
                        ? "#d4edda"
                        : "#fff3cd",
                  }}
                >
                  {order.status}
                </span>
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total_price}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrder;
