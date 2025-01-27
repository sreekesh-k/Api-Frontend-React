import React from "react";
import "./App.css";
import VendorEntry from "./pages/VendorEntry";
import Vendor from "./pages/Vendor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";
import Layout from "./layouts/vendors/Layout";

const App = () => {
  return (
    <>
      <Layout>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Vendor />} />
              <Route path="/vendordetail" element={<VendorEntry />} />
            </Routes>
          </Router>
        </Provider>
      </Layout>
    </>
  );
};

export default App;
