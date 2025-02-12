import React from "react";
import "./App.css";
import VendorEntry from "./pages/vendors/VendorEntry";
import Vendor from "./pages/vendors/Vendor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Vendor />} />
            <Route path="/vendordetail" element={<VendorEntry />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
