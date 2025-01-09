import React from "react";
import VendorApp from "./pages/VendorApp";
import Vendor from "./pages/Vendor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vendor />} />
        <Route path="/vendordetail" element={<VendorApp />} />
      </Routes>
    </Router>
  );
}

export default App;
