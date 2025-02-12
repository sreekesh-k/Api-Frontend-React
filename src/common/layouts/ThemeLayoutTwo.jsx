import React from "react";
import LeftPanel from "./LeftPanel";
import Footer from "./Footer";
import Header from "./Header";

function ThemeLayoutTwo({ children }) {
  return (
    <>
      <LeftPanel />
      <div className="main-panel">
        <div className="panel-header">
          <Header />
          <div className="action-centre-nav">
            <ul className="nav nav-tabs action-tabs">
              <li className="active">
                <a id="dueId" className="" data-toggle="tab" href="#DueTable">
                  <span className="tab-num"></span>
                  <br />
                  Due
                </a>
              </li>
              <li>
                <a
                  id="overdueId"
                  className=""
                  data-toggle="tab"
                  href="#OverdueTable"
                >
                  <span className="tab-num"></span>
                  <br />
                  Overdue
                </a>
              </li>
              <li>
                <a
                  id="upcomingId"
                  className=""
                  data-toggle="tab"
                  href="#Upcoming"
                >
                  <span className="tab-num"></span>
                  <br />
                  Upcoming
                </a>
              </li>
              <li>
                <a
                  id="inprogressId"
                  className=""
                  data-toggle="tab"
                  href="#Inprogress"
                >
                  <span className="tab-num"></span>
                  <br />
                  InProgress
                </a>
              </li>
              <li>
                <a
                  id="completedId"
                  className=""
                  data-toggle="tab"
                  href="#Completed"
                >
                  <span className="tab-num"></span>
                  <br />
                  Completed
                </a>
              </li>
            </ul>
          </div>
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
