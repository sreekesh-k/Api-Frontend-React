import React from "react";
import { useLocation } from "react-router-dom";
import VendorApp from "../components/vendorsEntry/VendorApp";
import { Provider } from "react-redux";
import store from "../store/Store";

function VendorEntry() {
  // Get query params from the URL
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const vendorId = queryParams.get("id");
  // // Retrieve the vendor type from sessionStorage
  // const vendorType = sessionStorage.getItem("vendorType");

  return (
    <>
      <Provider store={store}>
        <VendorApp />
        {/* <VendorApp VendorDetailsForm={VendorDetailsForm} VendorCategorization={VendorCategorization} VendorRating={VendorRating} /> */}
      </Provider>

      {/* Display the vendor details (DEBUG)*/}
      {/* <div>
        <h1>Vendor Details</h1>
        <p>Vendor ID: {vendorId}</p>
        <p>Vendor Type: {vendorType}</p>
      </div> */}
    </>
  );
}

export default VendorEntry;
