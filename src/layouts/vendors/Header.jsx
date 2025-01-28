import React from "react";

function Header() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-header" id="navbarHeaderContainer">
          <a
            className="navbar-brand edashboard-nav-caption"
            title="VendorMaster"
          >
            Vendor Master
          </a>
          <div className="header-buttons"></div>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            {/* <li className="dropdown searchContainer">
              <input
                id="HeaderFilterSearch"
                className="form-control"
                type="search"
                placeholder="Search"
              />
            </li> */}
            <li>
              <button
                id="global-search-btn"
                style={{
                  transform: "rotateY(180deg)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <defs>
                    <clipPath id="clip-Misc_Search">
                      <rect width="20" height="20" />
                    </clipPath>
                  </defs>
                  <g id="Misc_Search" clipPath="url(#clip-Misc_Search)">
                    <path
                      id="Path_1350"
                      data-name="Path 1350"
                      d="M9.521,0A7.438,7.438,0,0,0,2.07,7.45a7.317,7.317,0,0,0,2,5.055L.274,16.3a.766.766,0,0,0,0,1.131.755.755,0,0,0,.532.2.755.755,0,0,0,.532-.2L5.2,13.57A7.468,7.468,0,1,0,9.521,0Zm0,13.37a5.92,5.92,0,1,1,5.92-5.92A5.933,5.933,0,0,1,9.521,13.37Z"
                      transform="translate(1.629 1.5)"
                    />
                  </g>
                </svg>
              </button>
            </li>
            <li className="dropdown">
              <a href="#" id="unreadNotifications">
                <i className="material-icons">notifications</i>

                <span className="notification"></span>

                <span className="notification"></span>
                <p className="hidden-lg hidden-md">
                  Notifications
                  <b className="caret"></b>
                </p>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="material-icons">power_settings_new</i>
              </a>
            </li>
            <li>
              <div className="user">
                <span className="user-name">Poc Team</span>
                <a href="#">
                  <div className="photo">
                    <img src="/assets/default_avatar.jpg" />
                  </div>
                </a>
              </div>
            </li>
            <li className="separator hidden-lg hidden-md"></li>
          </ul>
        </div>
      </div>
      <div id="root2"></div>
    </nav>
  );
}

export default Header;
