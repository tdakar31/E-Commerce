import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

import Login from "./Page/Login";
import Home from "./Page/Home";
import About from "./Page/About";
import Contact from "./Page/Contact";
import Product from "./Page/Product";
import AddProduct from "./Page/AddProduct";
// import Login from "./Page/Login";
import Register from "./Page/Register";
import ForgotPassword from "./Page/ForgotPassword";
import Cart from "./Page/Cart";
// import Dashboard from "./Page/Dashboard";
import Shop from "./Page/Shop";



function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // let page grow naturally
        width: "100%",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main style={{ flexGrow: 1, width: "100%" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<Product />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          <Route path="/shop" element={<Shop/>}/>
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
