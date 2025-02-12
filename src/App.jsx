import React from "react";
import "./App.css";
import VendorEntry from "./pages/vendors/VendorEntry";
import Vendor from "./pages/vendors/Vendor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";
import ActionCenter from "./pages/actionCenter/ActionCenter";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Vendor />} />
            <Route path="/vendordetail" element={<VendorEntry />} />
            <Route path="/actioncenter" element={<ActionCenter />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
