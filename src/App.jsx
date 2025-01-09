import React from "react";
import VendorEntry from "./pages/VendorEntry";
import Vendor from "./pages/Vendor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vendor />} />
        <Route path="/vendordetail" element={<VendorEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
