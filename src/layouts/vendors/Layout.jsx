import React from "react";
import LeftPlane from "./LeftPlane";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <LeftPlane />
      <div className="main-panel">
        <div className="panel-header">
          <Header />
        </div>
        <div className="main-container">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
