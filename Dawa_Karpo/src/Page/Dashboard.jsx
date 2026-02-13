// import { useState } from "react";
// import Profile from "../Component/Profile";
// import MyOrder from "../Component/MyOrder";
// import TrackOrder from "../Component/TrackOrder";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("profile");

//   const containerStyle = {
//     minHeight: "100vh",
//     // backgroundColor: "#f4f6f9",
//     padding: "200px",
//   };

//   const cardStyle = {
//     maxWidth: "1100px",
//     margin: "0 auto",
//     backgroundColor: "#ffffff",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//     borderRadius: "12px",
//     display: "flex",
//     overflow: "hidden",
//   };

//   const sidebarStyle = {
//     width: "25%",
//     borderRight: "1px solid #eee",
//     padding: "30px 20px",
//     backgroundColor: "#fafafa",
//   };

//   const buttonStyle = (tab) => ({
//     width: "100%",
//     padding: "12px 15px",
//     marginBottom: "15px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     textAlign: "left",
//     fontSize: "15px",
//     fontWeight: "500",
//     backgroundColor: activeTab === tab ? "#2563eb" : "#ffffff",
//     color: activeTab === tab ? "#ffffff" : "#333",
//     boxShadow:
//       activeTab === tab
//         ? "0 4px 12px rgba(37,99,235,0.3)"
//         : "0 2px 6px rgba(0,0,0,0.05)",
//     transition: "all 0.3s ease",
//   });

//   const contentStyle = {
//     width: "75%",
//     padding: "40px",
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={cardStyle}>

//         {/* Sidebar */}
//         <div style={sidebarStyle}>
//           <h2
//             style={{
//               fontSize: "22px",
//               fontWeight: "700",
//               marginBottom: "30px",
//               color: "#333",
//             }}
//           >
//             My Dashboard
//           </h2>

//           <button
//             onClick={() => setActiveTab("profile")}
//             style={buttonStyle("profile")}
//           >
//             👤 My Profile
//           </button>

//           <button
//             onClick={() => setActiveTab("orders")}
//             style={buttonStyle("orders")}
//           >
//             📦 My Orders
//           </button>

//           <button
//             onClick={() => setActiveTab("track")}
//             style={buttonStyle("track")}
//           >
//             🚚 Track Order
//           </button>
//         </div>

//         {/* Content */}
//         <div style={contentStyle}>
//           {activeTab === "profile" && <Profile />}
//           {activeTab === "orders" && <MyOrder />}
//           {activeTab === "track" && <TrackOrder />}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("profile");
  const [profile, setProfile] = useState(null); // Database data state
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Assuming you stored your token in localStorage during login
        const token = localStorage.getItem("access_token"); 
        
        const response = await axios.get(`${BASE_URL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Matches IsAuthenticated requirement
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const orders = [
    { id: "ORD001", product: "Nike Shoes", price: "₹2,499", status: "Shipped" },
    { id: "ORD002", product: "Adidas T-Shirt", price: "₹1,299", status: "Processing" },
  ];

  const renderContent = () => {
    if (activePage === "profile") {
      if (loading) return <p>Loading profile...</p>;
      if (!profile) return <p>Error loading profile details.</p>;

      return (
        <div>
          <h2 style={titleStyle}>👤 Profile Details</h2>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            {profile.profile_photo && (
              <img 
                src={`${BASE_URL}${profile.profile_photo}`} 
                alt="Profile" 
                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #2563eb" }}
              />
            )}
          </div>
          <div style={infoCard}>
            {/* Dynamic data from your Serializer */}
            <p><strong>Full Name:</strong> {profile.full_name || "Not set"}</p>
            <p><strong>Phone:</strong> {profile.phone || "Not set"}</p>
            <p><strong>Address:</strong> {profile.address || "Not set"}</p>
            <p><strong>Date of Birth:</strong> {profile.dob || "Not set"}</p>
          </div>
        </div>
      );
    }

    if (activePage === "orders" || activePage === "track") {
       return (
        <div>
          <h2 style={titleStyle}>{activePage === "orders" ? "📦 My Orders" : "🚚 Track Order"}</h2>
          {orders.map((order) => (
            <div key={order.id} style={orderCard}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Product:</strong> {order.product}</p>
              <p><strong>Price:</strong> {order.price}</p>
              <span style={statusBadge(order.status)}>{order.status}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  // --- Styles remain the same as your provided code ---
  const sidebarButtonStyle = (page) => ({
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    backgroundColor: activePage === page ? "#2563eb" : "transparent",
    color: activePage === page ? "#fff" : "#d1d5db",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    textAlign: "left",
    transition: "0.3s ease",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", background: "linear-gradient(135deg, #1e3a8a, #2563eb)" }}>
      <div style={{ width: "240px", backgroundColor: "#111827", padding: "30px 20px", color: "white", boxShadow: "4px 0 15px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "22px", fontWeight: "700" }}>My Dashboard</h2>
        <button onClick={() => setActivePage("profile")} style={sidebarButtonStyle("profile")}>👤 Profile</button>
        <button onClick={() => setActivePage("orders")} style={sidebarButtonStyle("orders")}>📦 My Orders</button>
        <button onClick={() => setActivePage("track")} style={sidebarButtonStyle("track")}>🚚 Track Order</button>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
        <div style={{ width: "600px", backgroundColor: "#ffffff", padding: "40px", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const titleStyle = { marginBottom: "25px", fontSize: "22px", fontWeight: "700", color: "#1f2937" };
const infoCard = { backgroundColor: "#f3f4f6", padding: "20px", borderRadius: "12px", lineHeight: "28px" };
const orderCard = { padding: "20px", marginBottom: "20px", backgroundColor: "#f9fafb", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.05)" };
const statusBadge = (status) => ({
  display: "inline-block", marginTop: "10px", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", 
  fontWeight: "600", backgroundColor: status === "Shipped" ? "#dcfce7" : "#fef3c7", color: status === "Shipped" ? "#166534" : "#92400e",
});

export default Dashboard;