import React from "react";
import { Layout, Menu } from "antd";
import "./App.css";
import VendorEntry from "./pages/VendorEntry";
import Vendor from "./pages/Vendor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";
import Sidebar from "./Sidebar";

const { Header } = Layout;

const App = () => {
  return (
    <>
      <div style={{width:"84px"}}>
        <Sidebar />
      </div>
      <div style={{flex:"1"}}>
        <Header className="app-header">
          <div className="header-title">Vendor Master</div>
          <div className="header-user">
            <i className="fas fa-search"></i>
            <span style={{ marginRight: ".5rem" }}>POC TEAM</span>
            <i className="fas fa-user-circle fa-lg"></i>
          </div>
        </Header>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Vendor />} />
              <Route path="/vendordetail" element={<VendorEntry />} />
            </Routes>
          </Router>
        </Provider>
      </div>
    </>
  );
};

export default App;
