// import { useEffect, useState } from "react";

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/profile/", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => setUser(data));
//   }, []);

//   if (!user) return <p style={{ padding: "20px" }}>Loading...</p>;

//   return (
//     <div
//       style={{
//         padding: "30px",
//         backgroundColor: "#ffffff",
//         borderRadius: "12px",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//       }}
//     >
//       <h2
//         style={{
//           fontSize: "24px",
//           fontWeight: "700",
//           marginBottom: "25px",
//           color: "#333"
//         }}
//       >
//         My Profile
//       </h2>

//       <div style={{ lineHeight: "2", fontSize: "16px", color: "#555" }}>
//         <p><strong>Name:</strong> {user.username}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Phone:</strong> {user.phone}</p>
//         <p><strong>Address:</strong> {user.address}</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
// import MyOrder from "./MyOrder";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://127.0.0.1:8000/api/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }
      return res.json();
    })
    .then((data) => {
      console.log("PROFILE DATA:", data);
      setUser(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);
  return (
    <div
      style={{
        padding: "200px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "28px",
            fontWeight: "700",
            color: "#2d3748",
          }}
        >
          👤 My Profile
        </h2>

        {/* Profile Image */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          {user.profile_photo && (
            <img
              src={`http://127.0.0.1:8000${user.profile_photo}`}
              alt="Profile"
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #2d6cdf",
              }}
            />
          )}
        </div>

        {/* Profile Details */}
        <div
          style={{
            lineHeight: "2.2",
            fontSize: "16px",
            color: "#4a5568",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <strong>Username:</strong> {user.username}
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong>Email:</strong> {user.email}
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong>Full Name:</strong> {user.full_name}
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong>Phone:</strong> {user.phone}
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong>Address:</strong> {user.address}
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong>Date of Birth:</strong> {user.dob}
          </div>
        </div>

        {/* Button */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            style={{
              padding: "10px 25px",
              backgroundColor: "#2d6cdf",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
