import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("manage");
  const [orders, setOrders] = useState([]);

  // 🔥 Fetch orders from Django backend
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/my-orders/")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // 🧠 Calculate Order Status Based On Date
  const getStatusFromDate = (deliveryDate) => {
    const today = new Date();
    const delivery = new Date(deliveryDate);

    if (today.toDateString() === delivery.toDateString()) {
      return "Delivered";
    } else if (today < delivery) {
      return "Shipped";
    } else {
      return "Delivered";
    }
  };

  const formatDeliveryDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      padding: "40px",
      marginTop: "80px"
    }}>
      <h1 style={{
        textAlign: "center",
        color: "#fff",
        marginBottom: "30px"
      }}>
        📦 My Orders Dashboard
      </h1>

      {/* Tabs */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <button onClick={() => setActiveTab("manage")} style={tabStyle(activeTab === "manage")}>
          Manage Orders
        </button>
        <button onClick={() => setActiveTab("track")} style={tabStyle(activeTab === "track")}>
          Track Orders
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >

        {orders.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>
            No orders found
          </p>
        ) : (
          orders.map((order) => {
            const status = getStatusFromDate(order.delivery_date);

            return (
              <div key={order.id} style={cardStyle}>
                <div style={{ display: "flex", gap: "25px" }}>
                  
                  <img
                    src={`http://127.0.0.1:8000${order.product_image}`}
                    alt={order.product_name}
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "15px",
                      objectFit: "cover"
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h2>{order.product_name}</h2>

                    <p><strong>Price:</strong> ₹{order.price}</p>
                    <p><strong>Size:</strong> {order.size}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Total:</strong> ₹{order.price * order.quantity}</p>

                    <p style={{
                      marginTop: "10px",
                      fontWeight: "bold",
                      color: "#4CAF50"
                    }}>
                      Get it by {formatDeliveryDate(order.delivery_date)}
                    </p>

                    {activeTab === "track" && (
                      <div style={{ marginTop: "20px" }}>
                        <ProgressBar status={status} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

      </motion.div>
    </div>
  );
};

/* Progress Bar */

const ProgressBar = ({ status }) => {
  const steps = ["Processing", "Shipped", "Delivered"];
  const currentStep = steps.indexOf(status);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {steps.map((step, index) => (
        <div key={step} style={{ textAlign: "center", flex: 1 }}>
          <div style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%",
            margin: "0 auto",
            background: index <= currentStep ? "#4CAF50" : "#ccc",
            transition: "0.4s"
          }} />
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
};

const tabStyle = (active) => ({
  padding: "10px 25px",
  borderRadius: "25px",
  border: "none",
  cursor: "pointer",
  background: active ? "#fff" : "#ddd",
  color: active ? "#764ba2" : "#000",
  fontWeight: "bold"
});

const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "20px",
  marginBottom: "25px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
};

export default Dashboard;
