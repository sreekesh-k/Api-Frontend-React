import React from "react";
import VendorEntry from "./pages/VendorEntry";
import Vendor from "./pages/Vendor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Vendor />} />
          <Route path="/vendordetail" element={<VendorEntry />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
