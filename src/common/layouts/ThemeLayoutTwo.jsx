import React from "react";
import LeftPanel from "./LeftPanel";
import Footer from "./Footer";
import Header from "./Header";

function ThemeLayoutTwo ({ children }) {
  return (
    <>
      <LeftPanel />
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

export default ThemeLayoutTwo;
