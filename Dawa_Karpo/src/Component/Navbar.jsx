import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../utils/cart";
import defaultProfile from "../assets/profile.jpg";

const Navbar = () => {
  const [count, setCount] = useState(0);
  const [dropdown, setDropdown] = useState(false); // ✅ NEW
  const navigate = useNavigate();
  const user = localStorage.getItem("user"); // 👈 get logged user
  const profileImage = localStorage.getItem("profile_image"); // ✅ NEW

  useEffect(() => {
    const updateCartCount = () => {
      setCount(getCart().length);
    };

    updateCartCount();
    // window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      // window.removeEventListener("storage", updateCartCount);
      window.addEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profile_image"); // ✅ NEW
    navigate("/");
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: #fff;
          border-bottom: 1px solid #e5e5e5;
          z-index: 1000;
        }
        .navbar-container {
          max-width: 1500px;
          margin: auto;
          padding: 8px 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          justify-content: space-between; /* ✅ push right */
        }
        .left-side {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .logo img {
          height: 80px;
          cursor: pointer;
        }
        .nav-links {
          display: flex;
          gap: 20px;
          list-style: none;
        }
        .nav-links a {
          text-decoration: none;
          color: black;
        }
        .right-side {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }
        .cart-icon {
          font-size: 18px;
          text-decoration: none;
          color: black;
          position: relative;
        }
        .cart-icon span {
          background: black;
          color: white;
          border-radius: 50%;
          padding: 2px 7px;
          font-size: 12px;
          position: absolute;
          top: -8px;
          right: -10px;
        }

        .profile-img{
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          cursor: pointer;
          border: 2px solid #667eea;
        }

        .profile-circle {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #667eea;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          cursor: pointer;
        }

        .logout-btn {
          border: none;
          background: none;
          cursor: pointer;
          font-size: 14px;
        }
          .dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          width: 150px;
          padding: 8px 0;
        }

        .dropdown a, .dropdown button {
          display: block;
          width: 100%;
          padding: 8px 15px;
          text-decoration: none;
          color: black;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
        }

        .dropdown a:hover,
        .dropdown button:hover {
          background: #f3f3f3;
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">

          {/* LEFT */}
          <div className="left-side">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            <div className="nav-links">
              <Link to="/home">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-side">

            {/* Cart */}
            <Link to="/cart" className="cart-icon">
              🛒 <span>{count}</span>
            </Link>

            {/* Profile Image */}
            {user && (
              <>
                <img
                  src={
                    profileImage
                      ? `http://127.0.0.1:8000${profileImage}`
                      : defaultProfile
                  }
                  alt="Profile"
                  className="profile-img"
                  onClick={() => setDropdown(!dropdown)}
                />

                {dropdown && (
                  <div className="dropdown">
                    {/* <Link to="/dashboard">Dashboard</Link> */}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
