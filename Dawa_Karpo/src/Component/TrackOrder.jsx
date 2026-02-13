// import { useState } from "react";

// const TrackOrder = () => {
//   const [orderId, setOrderId] = useState("");
//   const [order, setOrder] = useState(null);

//   const handleTrack = () => {
//     fetch(`http://127.0.0.1:8000/api/track-order/${orderId}/`)
//       .then(res => res.json())
//       .then(data => setOrder(data));
//   };

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
//         Track Order
//       </h2>

//       <div style={{ marginBottom: "25px" }}>
//         <input
//           type="text"
//           placeholder="Enter Order ID"
//           value={orderId}
//           onChange={(e) => setOrderId(e.target.value)}
//           style={{
//             padding: "12px",
//             width: "250px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             marginRight: "10px",
//             fontSize: "14px"
//           }}
//         />
//         <button
//           onClick={handleTrack}
//           style={{
//             padding: "12px 20px",
//             borderRadius: "8px",
//             border: "none",
//             backgroundColor: "#2563eb",
//             color: "#fff",
//             fontWeight: "600",
//             cursor: "pointer",
//             boxShadow: "0 4px 10px rgba(37,99,235,0.3)"
//           }}
//         >
//           Track
//         </button>
//       </div>

//       {order && (
//         <div
//           style={{
//             padding: "20px",
//             borderRadius: "10px",
//             backgroundColor: "#ffffff",
//             boxShadow: "0 6px 15px rgba(0,0,0,0.07)",
//             borderLeft: "5px solid #22c55e"
//           }}
//         >
//           <p><strong>Status:</strong> {order.status}</p>
//           <p><strong>Estimated Delivery:</strong> {order.delivery_date}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TrackOrder;

import { useState } from "react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrack = () => {
    fetch(`http://127.0.0.1:8000/api/track-order/${orderId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrder(data));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "120px 20px",
        backgroundColor: "#f4f6f9",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          🚚 Track Order
        </h2>

        <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
          <input
            type="number"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          />

          <button
            onClick={handleTrack}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            Track
          </button>
        </div>

        {order && (
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ marginBottom: "8px" }}>
              <strong>Product:</strong> {order.product_name}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.total_price}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
